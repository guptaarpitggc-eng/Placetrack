# 🎯 PlaceTrack — Placement Preparation Tracker

*PlaceTrack* is a full-stack web application designed to help students organize and track their placement preparation in one place. It provides a centralized dashboard for managing DSA practice, technical subjects, aptitude preparation, daily tasks, study plans, goals, and learning resources.

The application is built using the *MERN stack* and deployed using Render, with MongoDB Atlas for cloud database storage.

---

## 🚀 Live Demo

- *Frontend:* https://placetrack-9nop.onrender.com
- *Backend API:* https://placetrack-api-c3zj.onrender.com

> The frontend is the main application. The backend URL displays a server status page and provides API endpoints.

---

## ✨ Features

### 🔐 Authentication
- User registration and login.
- JWT-based authentication.
- Protected API routes.
- Persistent login sessions using browser local storage.
- Logout and session clearing.

### 📊 Dashboard
- Centralized placement preparation dashboard.
- Overview of preparation progress.
- Summary statistics for tracked activities.

### 💻 DSA Problem Tracker
- Add coding problems.
- View and manage saved problems.
- Update problem details and completion status.
- Delete problems when no longer needed.

### 📚 Subject Tracker
- Organize technical subjects.
- Track subject preparation.
- Add, update, and remove subject entries.

### 🧠 Aptitude Practice
- Access aptitude practice functionality.
- Record practice activity.
- Track aptitude preparation progress.

### 📅 Study Planner
- Create study plans.
- Organize preparation activities.
- View and manage planned tasks.

### 🎯 Goals
- Set placement preparation goals.
- Update goal details and progress.
- Delete completed or unnecessary goals.

### ✅ Task Management
- Create daily preparation tasks.
- Update task information and status.
- Delete tasks when completed or no longer required.

### 🔗 Learning Resources
- Save useful learning resources.
- Organize links for placement preparation.
- Manage saved resources.

### ☁️ Cloud Database
- MongoDB Atlas integration.
- User-specific data storage.
- Persistent data across sessions and devices when using the same account.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

### Development Tools
- Git
- GitHub
- npm
- Visual Studio Code

### Deployment
- Render — Frontend static site
- Render — Backend web service
- MongoDB Atlas — Cloud database

---

## 📁 Project Structure

text
Placetrack_GitHub/
│
├── server/
│   ├── models/
│   │   ├── Problem.js
│   │   ├── Resource.js
│   │   ├── Subject.js
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── .env.example
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── pages/
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── Sidebar.jsx
│   └── useUser.js
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js


---

## ⚙️ Installation and Setup

### Prerequisites

Install the following tools before running the project locally:

- Node.js and npm
- Git
- Visual Studio Code
- A MongoDB Atlas account or another accessible MongoDB database

### 1. Clone the Repository

bash
git clone https://github.com/guptaarpitggc-eng/Placetrack.git


Navigate to the project directory:

bash
cd Placetrack


### 2. Configure the Backend

Navigate to the server directory:

bash
cd server


Install the backend dependencies:

bash
npm install


Create a .env file inside the server/ directory.

Add the following environment variables:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret


Replace the example values with your actual MongoDB connection string and a strong, unique JWT secret.

*Important:* Never commit your .env file or publish database credentials and JWT secrets.

### 3. Start the Backend

From the server/ directory, run:

bash
npm start


The backend should start on:

text
http://localhost:5000


To verify that the backend is running, open:

text
http://localhost:5000


You should see the server status response.

### 4. Configure the Frontend

Open a second terminal at the project root:

bash
cd Placetrack


Install the frontend dependencies:

bash
npm install


For local development, the Vite configuration proxies /api requests to the backend at http://localhost:5000.

Make sure the backend is running before using the frontend.

### 5. Start the Frontend

Run:

bash
npm run dev


Open the local URL displayed in your terminal. With the default Vite configuration, it is usually:

text
http://localhost:5173


You can now register an account and start using PlaceTrack.

---

## 🌐 Deployment on Render

PlaceTrack is deployed as two separate Render services.

### Frontend — Static Site

- *Service type:* Static Site
- *Repository:* guptaarpitggc-eng/Placetrack
- *Branch:* main
- *Root Directory:* Leave blank
- *Build Command:*

bash
npm install && npm run build


- *Publish Directory:*

text
dist


Configure the following environment variable in the frontend's Render settings:

| Variable | Value |
|---|---|
| VITE_API_URL | https://placetrack-api-c3zj.onrender.com |

The frontend uses this variable to send API requests to the deployed backend.

### Backend — Web Service

- *Service type:* Web Service
- *Repository:* guptaarpitggc-eng/Placetrack
- *Branch:* main
- *Root Directory:* server
- *Build Command:*

bash
npm install


- *Start Command:*

bash
npm start


Configure the following environment variables in the backend's Render settings:

| Variable | Description |
|---|---|
| MONGODB_URI | MongoDB Atlas connection string |
| JWT_SECRET | Strong, unique secret used to sign JWTs |
| PORT | Usually assigned automatically by Render; the server should use process.env.PORT |

Do not add real credentials to this README or commit them to GitHub.

> *Note:* If you change a service's URL, update VITE_API_URL in the frontend environment settings and redeploy the frontend.

---

## 🔌 API Endpoints

The backend exposes REST API endpoints under /api.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/signup | Register a new user |
| POST | /api/login | Log in a user |
| GET | /api/profile | Retrieve the authenticated user's profile |
| PUT | /api/profile | Update the user's profile |
| GET | /api/problems | Retrieve coding problems |
| POST | /api/problems | Create a coding problem |
| PUT | /api/problems/:id | Update a coding problem |
| DELETE | /api/problems/:id | Delete a coding problem |
| GET | /api/subjects | Retrieve subjects |
| POST | /api/subjects | Create a subject |
| PUT | /api/subjects/:id | Update a subject |
| DELETE | /api/subjects/:id | Delete a subject |
| GET | /api/aptitude | Retrieve aptitude data |
| POST | /api/aptitude/practice | Record aptitude practice |
| GET | /api/planner | Retrieve study plans |
| POST | /api/planner | Create a study plan |
| DELETE | /api/planner/:id | Delete a study plan |
| GET | /api/goals | Retrieve goals |
| POST | /api/goals | Create a goal |
| PUT | /api/goals/:id | Update a goal |
| DELETE | /api/goals/:id | Delete a goal |
| GET | /api/tasks | Retrieve tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| GET | /api/resources | Retrieve learning resources |
| POST | /api/resources | Create a resource |
| DELETE | /api/resources/:id | Delete a resource |
| GET | /api/stats | Retrieve dashboard statistics |

*Authentication:* Protected endpoints require a valid JWT in the request header:

http
Authorization: Bearer <your_token>


The exact request fields and response formats depend on the implementation of each endpoint.

---

## 🗄️ Database

PlaceTrack uses MongoDB with Mongoose for database operations.

The backend connects to the configured MongoDB database through the MONGODB_URI environment variable.

The application uses Mongoose models to organize data, including:

- *User* — User accounts and profile information.
- *Problem* — DSA problem records.
- *Subject* — Technical subject records.
- *Task* — Preparation tasks.
- *Resource* — Saved learning resources.

Other application data, such as goals, study plans, and aptitude practice, is handled by the backend's data models and routes.

Data is stored in MongoDB rather than being limited to the browser's temporary session.

---

## 🔒 Security

PlaceTrack uses several security-related mechanisms:

- JWT-based authentication.
- Protected API routes.
- Environment variables for sensitive configuration.
- MongoDB database access through the backend.
- Session token storage in browser local storage.

### Security Best Practices

- Never commit .env files.
- Never expose MongoDB passwords or JWT secrets.
- Use strong, unique secrets in production.
- Restrict MongoDB Atlas network access appropriately.
- Keep dependencies updated.
- Use HTTPS for deployed services.

*Note:* Browser local storage is convenient for session persistence, but it is accessible to JavaScript running on the page. Avoid storing sensitive personal information in it.

---

## 🧪 Build and Test

### Build the Frontend

From the project root:

bash
npm run build


This generates the production-ready frontend in the dist/ directory.

### Run the Frontend Locally

bash
npm run dev


### Run the Backend

From the server/ directory:

bash
npm start


---

## 🔄 Development Workflow

The project uses Git and GitHub for version control.

To check your current changes:

bash
git status


To stage changes:

bash
git add .


To commit changes:

bash
git commit -m "Describe your changes"


To push changes to GitHub:

bash
git push origin main


If automatic deployment is enabled in Render, pushing changes to the configured branch can trigger a new deployment.

---

## 🎯 Project Objectives

PlaceTrack aims to:

- Help students organize placement preparation.
- Encourage consistent DSA practice.
- Make technical subject revision easier to manage.
- Support aptitude preparation and daily planning.
- Track goals and tasks in one place.
- Provide a centralized collection of learning resources.
- Offer a full-stack application with persistent cloud data.

---

## 🔮 Future Enhancements

Potential improvements include:

- Advanced analytics and preparation reports.
- Calendar integration and reminders.
- More detailed DSA progress visualization.
- Improved mobile responsiveness.
- Enhanced testing and automated CI/CD.
- Additional study-planning and progress-tracking features.

---

## 📄 License

This project was developed for educational and placement-preparation purposes.

Add a specific open-source license if you intend to permit reuse, modification, and redistribution under defined terms.
