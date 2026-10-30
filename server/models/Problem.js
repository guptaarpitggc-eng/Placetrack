const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  topic: {
    type: String,
    default: "",
    maxlength: 50,
  },
  difficulty: {
    type: String,
    default: "",
    maxlength: 20,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Solved", "Revision Needed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports =
  mongoose.models.Problem || mongoose.model("Problem", schema);