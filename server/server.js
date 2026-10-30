require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { connectDB } = require("./db");

const User = require("./models/User");
const Problem = require("./models/Problem");
const Subject = require("./models/Subject");
const Aptitude = require("./models/Aptitude");
const Planner = require("./models/Planner");
const Goal = require("./models/Goal");
const Task = require("./models/Task");
const Resource = require("./models/Resource");

const app = express();
const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is missing from server/.env");
}

app.use(cors());
app.use(express.json());

// Shared helpers for API routes.
const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const makeToken = (id) =>
  jwt.sign({ id: String(id) }, SECRET, { expiresIn: "7d" });

const isValidId = (id) => mongoose.isValidObjectId(id);

const APTITUDE_CATEGORIES = [
  "Quantitative Aptitude",
  "Logical Reasoning",
  "Verbal Ability",
];

const RESOURCE_CATEGORIES = [
  "DSA",
  "Aptitude",
  "Core Subjects",
  "Web Development",
  "Interview Preparation",
  "Other",
];

const RESOURCE_TYPES = ["Website", "Video", "Article", "Practice"];

const percent = (part, whole) =>
  whole > 0 ? Math.round((part / whole) * 100) : 0;

// Convert MongoDB documents into objects compatible with the frontend API.
function toApi(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;

  return {
    ...obj,
    id: String(obj._id),
    created_at: obj.created_at || obj.createdAt,
    _id: undefined,
    __v: undefined,
  };
}

// Reject requests containing an invalid MongoDB document ID.
function validRequestId(req, res, next) {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid record ID." });
  }

  next();
}

// Verify the JWT and identify the logged-in user.
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      error: "Please login first.",
    });
  }

  try {
    const payload = jwt.verify(token, SECRET);

    if (!isValidId(payload.id)) {
      return res.status(401).json({
        error: "Invalid session. Please login again.",
      });
    }

    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({
      error: "Session expired. Please login again.",
    });
  }
}

// Basic route to confirm that the backend is running.
app.get("/", (req, res) => {
  res.send(`
    <body style="font-family:sans-serif;background:#0f172a;color:#e2e8f0;padding:40px">
      <h2>✅ PlaceTrack server is running</h2>
      <p>This is only the backend (API). Open the app here:
      <a style="color:#818cf8" href="http://localhost:5173">
      http://localhost:5173</a></p>
    </body>
  `);
});

// Create an account, hash the password, and return a JWT.
app.post(
  "/api/signup",
  wrap(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please fill in all fields.",
      });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      return res.status(400).json({
        error: "Please fill in all fields.",
      });
    }

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "This email is already registered.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hash,
    });

    res.json({
      token: makeToken(user._id),
      user: {
        name: user.name,
        email: user.email,
      },
    });
  })
);

// Authenticate a user using their email and password.
app.post(
  "/api/login",
  wrap(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill in all fields.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(400).json({
        error: "Incorrect email or password.",
      });
    }

    res.json({
      token: makeToken(user._id),
      user: {
        name: user.name,
        email: user.email,
      },
    });
  })
);

// Return the profile of the authenticated user.
app.get(
  "/api/profile",
  auth,
  wrap(async (req, res) => {
    const user = await User.findById(req.userId).select(
      "name email college branch grad_year target_role company_type level"
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      college: user.college || "",
      branch: user.branch || "",
      year: user.grad_year || "",
      role: user.target_role || "",
      companyType: user.company_type || "",
      level: user.level || "",
    });
  })
);

// Update profile details while preventing duplicate email addresses.
app.put(
  "/api/profile",
  auth,
  wrap(async (req, res) => {
    const {
      name,
      email,
      college,
      branch,
      year,
      role,
      companyType,
      level,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const taken = await User.findOne({
      email: cleanEmail,
      _id: { $ne: req.userId },
    });

    if (taken) {
      return res.status(400).json({
        error: "This email is used by another account.",
      });
    }

    await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          name: cleanName,
          email: cleanEmail,
          college: college || "",
          branch: branch || "",
          grad_year: year || "",
          target_role: role || "",
          company_type: companyType || "",
          level: level || "",
        },
      },
      {
        runValidators: true,
      }
    );

    res.json({ ok: true });
  })
);

// DSA problems: retrieve all problems belonging to the logged-in user.
app.get(
  "/api/problems",
  auth,
  wrap(async (req, res) => {
    const rows = await Problem.find({
      userId: req.userId,
    }).sort({ createdAt: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Add a new DSA problem to the user's list.
app.post(
  "/api/problems",
  auth,
  wrap(async (req, res) => {
    const { name, topic, difficulty, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Problem name is required.",
      });
    }

    const problem = await Problem.create({
      userId: req.userId,
      name: name.trim(),
      topic: topic || "",
      difficulty: difficulty || "",
      status: status || "Pending",
    });

    res.json({
      ok: true,
      id: String(problem._id),
    });
  })
);

// Update the status of a problem after validating the requested value.
app.put(
  "/api/problems/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    const allowed = [
      "Pending",
      "In Progress",
      "Solved",
      "Revision Needed",
    ];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        error: "Choose a valid problem status.",
      });
    }

    const problem = await Problem.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        $set: {
          status: req.body.status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found.",
      });
    }

    res.json({
      ok: true,
      id: String(problem._id),
    });
  })
);

// Delete a problem only if it belongs to the authenticated user.
app.delete(
  "/api/problems/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found.",
      });
    }

    res.json({
      ok: true,
    });
  })
);

// Subjects: retrieve the user's subject progress.
app.get(
  "/api/subjects",
  auth,
  wrap(async (req, res) => {
    const rows = await Subject.find({
      user_id: req.userId,
    }).sort({ created_at: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Add a subject with its total number of topics.
app.post(
  "/api/subjects",
  auth,
  wrap(async (req, res) => {
    const name = (req.body.name || "").trim();
    const total = Number(req.body.total);

    if (!name) {
      return res.status(400).json({
        error: "Subject name is required.",
      });
    }

    if (
      !Number.isInteger(total) ||
      total < 1 ||
      total > 200
    ) {
      return res.status(400).json({
        error: "Total topics must be a whole number from 1 to 200.",
      });
    }

    await Subject.create({
      user_id: req.userId,
      name,
      total,
      done: 0,
    });

    res.json({ ok: true });
  })
);

// Remove a subject from the user's tracker.
app.delete(
  "/api/subjects/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Subject.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId,
    });

    res.json({ ok: true });
  })
);

// Update the completed-topic count without exceeding the subject total.
app.put(
  "/api/subjects/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    const subject = await Subject.findOne({
      _id: req.params.id,
      user_id: req.userId,
    });

    if (!subject) {
      return res.status(404).json({
        error: "Subject not found.",
      });
    }

    const requestedDone = Number(req.body.done) || 0;

    subject.done = Math.max(
      0,
      Math.min(subject.total, requestedDone)
    );

    await subject.save();

    res.json({ ok: true });
  })
);

// Aptitude: return practice statistics grouped by category.
app.get(
  "/api/aptitude",
  auth,
  wrap(async (req, res) => {
    const rows = await Aptitude.find({
      user_id: req.userId,
    }).sort({ created_at: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Record attempted and correct aptitude questions for a category.
app.post(
  "/api/aptitude/practice",
  auth,
  wrap(async (req, res) => {
    const attempted = Number(req.body.attempted);
    const correct = Number(req.body.correct);
    const category = req.body.category;

    if (!APTITUDE_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: "Unknown category.",
      });
    }

    if (
      !Number.isFinite(attempted) ||
      !Number.isFinite(correct) ||
      attempted <= 0 ||
      correct < 0 ||
      correct > attempted
    ) {
      return res.status(400).json({
        error:
          "Enter valid numbers (correct cannot be more than attempted).",
      });
    }

    await Aptitude.findOneAndUpdate(
      {
        user_id: req.userId,
        category,
      },
      {
        $inc: {
          attempted,
          correct,
        },
        $setOnInsert: {
          user_id: req.userId,
          category,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    res.json({ ok: true });
  })
);

// Study planner: retrieve the user's scheduled study sessions.
app.get(
  "/api/planner",
  auth,
  wrap(async (req, res) => {
    const rows = await Planner.find({
      user_id: req.userId,
    }).sort({ created_at: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Add a study session to the planner.
app.post(
  "/api/planner",
  auth,
  wrap(async (req, res) => {
    const { day, subject, duration } = req.body;

    if (
      !day ||
      !subject ||
      !subject.trim() ||
      duration === undefined ||
      duration === null ||
      duration === ""
    ) {
      return res.status(400).json({
        error: "Fill all fields.",
      });
    }

    await Planner.create({
      user_id: req.userId,
      day,
      subject: subject.trim(),
      duration,
    });

    res.json({ ok: true });
  })
);

// Remove a scheduled study session.
app.delete(
  "/api/planner/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Planner.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId,
    });

    res.json({ ok: true });
  })
);

// Goals: retrieve all goals created by the user.
app.get(
  "/api/goals",
  auth,
  wrap(async (req, res) => {
    const rows = await Goal.find({
      user_id: req.userId,
    }).sort({ created_at: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Create a new preparation goal.
app.post(
  "/api/goals",
  auth,
  wrap(async (req, res) => {
    const { title, period, progress } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Goal title is required.",
      });
    }

    await Goal.create({
      user_id: req.userId,
      title: title.trim(),
      period,
      progress: (progress || "").trim() || "Pending",
      done: false,
    });

    res.json({ ok: true });
  })
);

// Update whether a goal has been completed.
app.put(
  "/api/goals/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Goal.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.userId,
      },
      {
        $set: {
          done: Boolean(req.body.done),
        },
      }
    );

    res.json({ ok: true });
  })
);

// Delete a goal from the tracker.
app.delete(
  "/api/goals/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Goal.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId,
    });

    res.json({ ok: true });
  })
);

// Daily tasks: retrieve the user's dashboard tasks.
app.get(
  "/api/tasks",
  auth,
  wrap(async (req, res) => {
    const rows = await Task.find({
      user_id: req.userId,
    }).sort({ created_at: 1, _id: 1 });

    res.json(rows.map(toApi));
  })
);

// Create a daily task.
app.post(
  "/api/tasks",
  auth,
  wrap(async (req, res) => {
    if (
      !req.body.text ||
      !req.body.text.trim()
    ) {
      return res.status(400).json({
        error: "Task text is required.",
      });
    }

    await Task.create({
      user_id: req.userId,
      text: req.body.text.trim(),
      done: false,
    });

    res.json({ ok: true });
  })
);

// Update a task's completion status.
app.put(
  "/api/tasks/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.userId,
      },
      {
        $set: {
          done: Boolean(req.body.done),
        },
      }
    );

    res.json({ ok: true });
  })
);

// Delete a daily task.
app.delete(
  "/api/tasks/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId,
    });

    res.json({ ok: true });
  })
);

// Learning resources: retrieve saved resources, newest first.
app.get(
  "/api/resources",
  auth,
  wrap(async (req, res) => {
    const rows = await Resource.find({
      user_id: req.userId,
    }).sort({ created_at: -1, _id: -1 });

    res.json(rows.map(toApi));
  })
);

// Save a learning resource after validating its fields and URL.
app.post(
  "/api/resources",
  auth,
  wrap(async (req, res) => {
    const title = (req.body.title || "").trim();
    const category = req.body.category || "DSA";
    const resourceType = req.body.resourceType || "Website";
    const url = (req.body.url || "").trim();
    const description = (req.body.description || "").trim();

    if (!title || !url) {
      return res.status(400).json({
        error: "Resource title and URL are required.",
      });
    }

    if (!/^https?:\/\//i.test(url)) {
      return res.status(400).json({
        error: "URL must start with http:// or https://.",
      });
    }

    if (!RESOURCE_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: "Choose a valid category.",
      });
    }

    if (!RESOURCE_TYPES.includes(resourceType)) {
      return res.status(400).json({
        error: "Choose a valid resource type.",
      });
    }

    await Resource.create({
      user_id: req.userId,
      title,
      category,
      resource_type: resourceType,
      url,
      description,
    });

    res.json({ ok: true });
  })
);

// Delete a saved learning resource.
app.delete(
  "/api/resources/:id",
  auth,
  validRequestId,
  wrap(async (req, res) => {
    await Resource.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId,
    });

    res.json({ ok: true });
  })
);

// Calculate dashboard progress using MongoDB aggregation pipelines.
app.get(
  "/api/stats",
  auth,
  wrap(async (req, res) => {
    const userId = req.userId;

    const [
      problemStats,
      subjectStats,
      aptitudeStats,
      goalStats,
      taskStats,
      recentProblems,
    ] = await Promise.all([
      Problem.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            solved: {
              $sum: {
                $cond: [
                  { $eq: ["$status", "Solved"] },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),

      Subject.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            done: { $sum: "$done" },
            total: { $sum: "$total" },
          },
        },
      ]),

      Aptitude.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            attempted: { $sum: "$attempted" },
            correct: { $sum: "$correct" },
          },
        },
      ]),

      Goal.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            done: {
              $sum: {
                $cond: [{ $eq: ["$done", true] }, 1, 0],
              },
            },
          },
        },
      ]),

      Task.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            done: {
              $sum: {
                $cond: [{ $eq: ["$done", true] }, 1, 0],
              },
            },
          },
        },
      ]),

      // Fetch the four most recently created problems for the dashboard.
      Problem.find({ userId: userId })
        .sort({ createdAt: -1, _id: -1 })
        .limit(4)
        .select("name topic status createdAt")
        .lean(),
    ]);

    // Default missing aggregation results to zero.
    const p = problemStats[0] || { total: 0, solved: 0 };
    const s = subjectStats[0] || { done: 0, total: 0 };
    const a = aptitudeStats[0] || { attempted: 0, correct: 0 };
    const g = goalStats[0] || { total: 0, done: 0 };
    const t = taskStats[0] || { total: 0, done: 0 };

    const dsa = percent(p.solved, p.total);
    const subjects = percent(s.done, s.total);
    const aptitude = percent(a.correct, a.attempted);
    const goals = percent(g.done, g.total);

    res.json({
      dsa,
      subjects,
      aptitude,
      goals,
      overall: Math.round(
        (dsa + subjects + aptitude + goals) / 4
      ),
      problemsSolved: p.solved,
      problemsTotal: p.total,
      goalsDone: g.done,
      goalsTotal: g.total,
      tasksDone: t.done,
      tasksTotal: t.total,
      recent: recentProblems.map((problem) => ({
        ...problem,
        id: String(problem._id),
        created_at: problem.created_at || problem.createdAt,
        _id: undefined,
      })),
    });
  })
);

// Centralized error handler for database and API failures.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({
      error: "This record already exists.",
    });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid data provided.",
      details: err.message,
    });
  }

  res.status(500).json({
    error: "Server error. Check the server terminal.",
  });
});

// Start accepting requests only after MongoDB connects successfully.
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `✅ PlaceTrack server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Could not connect to MongoDB:", err.message);
    console.error(
      "Check MONGODB_URI and your MongoDB Atlas network access settings."
    );
    process.exit(1);
  });