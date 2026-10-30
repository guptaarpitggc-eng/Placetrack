# 🚀 PlaceTrack — Placement Preparation Tracker

**Prepare smarter. Track your progress. Get placement-ready.**

PlaceTrack is a full-stack web application designed to help students organize and track their placement preparation in one place. It brings DSA practice, aptitude preparation, core computer science subjects, daily study planning, goals, and learning resources together in a single platform.

The goal of PlaceTrack is to help students maintain consistency, monitor their progress, and identify areas that need more attention during placement preparation.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Application URLs](#-application-urls)
- [Troubleshooting](#-troubleshooting)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 📖 Overview

Preparing for placements involves managing multiple activities, including solving coding problems, practicing aptitude questions, revising core subjects, and following a consistent study schedule.

PlaceTrack provides a centralized platform where students can organize these activities and monitor their preparation.

Instead of maintaining separate spreadsheets or notes, students can use PlaceTrack to record their progress, manage daily goals, and access useful learning resources.

---

## ✨ Features

### 📊 1. Placement Preparation Dashboard

- View an overview of placement preparation.
- Monitor progress across different preparation modules.
- Track completed activities and pending tasks.
- Access important preparation information from one place.

### 💻 2. DSA Progress Tracker

- Organize coding problems by topic.
- Track problem difficulty and completion status.
- Manage problems using statuses such as Pending, In Progress, Solved, and Revision Needed.
- Identify topics that require more practice.
- Monitor progress through problem-solving statistics.

### 🧠 3. Aptitude Preparation Tracker

- Organize aptitude practice by category.
- Track questions attempted and correct answers.
- Calculate accuracy percentages.
- Monitor preparation across quantitative aptitude, logical reasoning, and verbal ability.

### 📚 4. Core Subjects Tracker

- Organize computer science subjects and their topics.
- Track completed and pending topics.
- Manage revision progress.
- Support preparation for technical placement interviews.

### 📅 5. Daily Study Planner

- Create and manage study plans and tasks.
- Organize tasks according to preparation areas.
- Track daily study activities.
- Mark tasks as completed.
- Monitor study progress.

### 🎯 6. Goals and Progress Tracking

- Create personal preparation goals.
- Track progress toward learning targets.
- Monitor completed activities.
- Encourage consistent study habits.

### 🔗 7. Learning Resources

- Save useful learning resources.
- Organize resources by category and type.
- Store resource titles, URLs, and descriptions.
- Keep important study materials accessible from one place.

### 🔐 8. User Authentication

- Register an account and log in.
- Authenticate users through the backend.
- Use token-based authentication to protect API endpoints.
- Associate application data with individual users.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tool |
| JavaScript | Application logic |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend server and REST API |
| MongoDB Atlas | Cloud NoSQL database |
| Mongoose | MongoDB object data modeling |
| JWT | Token-based authentication |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| Git and GitHub | Version control and collaboration |

---

## 📁 Project Structure

The following is a representative structure of the project. Some directories and files may differ depending on the current version.

```text
PlaceTrack/
│
├── public/                    # Static assets
│
├── src/                       # Frontend source code
│   ├── pages/                 # Application pages
│   ├── App.jsx                # Main React application
│   ├── api.js                 # API communication
│   └── main.jsx               # Frontend entry point
│
├── server/                    # Backend application
│   ├── models/                # Mongoose data models
│   ├── server.js              # Express server and API routes
│   ├── db.js                  # MongoDB connection
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json      # Backend dependency lockfile
│   └── .env.example           # Example environment configuration
│
├── index.html                 # Frontend HTML entry point
├── package.json               # Frontend dependencies and scripts
├── package-lock.json          # Frontend dependency lockfile
├── vite.config.js             # Vite configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to run PlaceTrack locally.

### Prerequisites

Install the following software:

- **Node.js and npm:** [Download Node.js](https://nodejs.org/)
- **Git:** [Download Git](https://git-scm.com/downloads)
- **Visual Studio Code:** [Download VS Code](https://code.visualstudio.com/) (recommended)

You also need:

- A MongoDB Atlas account and configured cluster.
- A MongoDB database user with appropriate permissions.
- Network access configured to allow your backend to connect to the cluster.

Verify that Node.js and npm are installed:

```bash
node -v
npm -v
```

---

### 1. Clone the Repository

Replace `<your-username>` with your GitHub username and use your actual repository name.

```bash
git clone https://github.com/<your-username>/<your-repository>.git
```

Navigate to the project directory:

```bash
cd <your-repository>
```

Alternatively, download your repository from GitHub and extract it.

### 2. Install Frontend Dependencies

From the project root, run:

```bash
npm install
```

### 3. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd server
npm install
```

---

## ⚙️ Environment Configuration

The backend requires environment variables for MongoDB connectivity and authentication.

### 1. Create the Environment File

From the `server` directory, create a local `.env` file using the example configuration.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

If `.env` already exists, do not overwrite your working configuration.

### 2. Configure Environment Variables

Open `server/.env` and configure the required values:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=replace_with_a_long_random_secret
```

- `PORT`: Port on which the backend server runs.
- `MONGODB_URI`: MongoDB Atlas connection string.
- `JWT_SECRET`: A strong, unique secret used for token authentication.

Use the actual environment variable names expected by the backend. Keep your existing working configuration if it uses additional variables.

### 3. Protect Your Credentials

- Never commit `.env` to GitHub.
- Never publish your MongoDB connection string or database password.
- Use a strong, unique JWT secret.
- Do not place real credentials in `.env.example`.
- Use appropriate MongoDB Atlas database permissions and network access restrictions.

---

## 🗄️ Database Setup

PlaceTrack uses **MongoDB Atlas** as its database.

### 1. Create a MongoDB Atlas Cluster

Create a cluster through [MongoDB Atlas](https://www.mongodb.com/atlas).

### 2. Configure Database Access

Create a database user and grant only the permissions required by your application.

Configure network access to allow connections from your development environment or deployment server.

### 3. Configure the Connection String

Copy your MongoDB connection string from Atlas and add it to `server/.env`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

Replace the placeholder with your actual connection string. Do not commit the real value.

### 4. Start the Backend

When the backend starts, it connects to MongoDB using the configured connection string.

Application data is managed through the Mongoose models in `server/models/`. Collections and documents are used instead of relational tables.

---

## ▶️ Running the Application

The frontend and backend must run simultaneously during local development.

### Terminal 1: Start the Backend

Open a terminal and navigate to the backend directory:

```powershell
cd server
npm start
```

The backend should start on:

```text
http://localhost:5000
```

The terminal should display a successful MongoDB connection message.

Keep this terminal running.

### Terminal 2: Start the Frontend

Open a second terminal in the project root:

```powershell
npm run dev
```

Vite will display the local development URL, usually:

```text
http://localhost:5173/
```

Open that address in your browser to use PlaceTrack.

If the frontend or backend uses a different port, use the URL displayed in the terminal and ensure the frontend API configuration matches the backend.

---

## 🌐 Application URLs

| Component | Local URL |
|---|---|
| Frontend | http://localhost:5173/ |
| Backend | http://localhost:5000/ |

These are local development addresses. They do not make the application publicly accessible over the internet.

---

## 🛠️ Troubleshooting

### MongoDB Connection Fails

Check the following:

- `MONGODB_URI` is correctly configured in `server/.env`.
- Your MongoDB Atlas database user has the necessary permissions.
- Your current IP address or server IP is allowed in Atlas network access settings.
- Your network connection is working.
- The connection string contains the correct credentials and database address.

### Backend Does Not Start

Verify that backend dependencies are installed:

```bash
cd server
npm install
npm start
```

Check the terminal for errors and confirm that the configured port is available.

### Frontend Does Not Start

From the project root, run:

```bash
npm install
npm run dev
```

If the development server selects a different port, open the URL displayed in the terminal.

### Login or API Requests Fail

- Confirm that the backend is running.
- Check the browser's developer console for frontend errors.
- Check the backend terminal for API errors.
- Verify that the frontend is sending requests to the correct backend address.
- Confirm that the authentication token is being handled correctly.

---

## 🔮 Future Improvements

Potential enhancements for future versions include:

- **Enhanced Analytics:** More detailed progress charts and weekly reports.
- **Revision Reminders:** Reminders for DSA problems that need revision.
- **Placement Readiness Score:** A summary of progress across preparation modules.
- **Study Streaks:** Track consecutive days of study activity.
- **Improved Resource Management:** Better organization, filtering, and categorization of learning resources.
- **Authentication Enhancements:** Additional authentication and account recovery options.

These are possible future enhancements and may not be implemented in the current version.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the changes locally.
5. Submit a pull request describing your changes.

Please avoid committing secrets, environment files, generated build output, or unnecessary dependency directories.

---


## 📄 License

Add the appropriate license information for your repository here. If the project does not yet have a license, choose one before distributing it for reuse.

---