// Dashboard.jsx — Home page
import { useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

const tasks = ["Solve 2 Array problems", "Revise DBMS transactions", "Practice aptitude", "Read interview questions"];
const progress = [{ label: "DSA", pct: 65 }, { label: "Core Subjects", pct: 72 }, { label: "Aptitude", pct: 58 }, { label: "Projects", pct: 85 }];
const activity = [
  { tag: "DSA",      text: "Solved Two Sum",           time: "Today" },
  { tag: "DBMS",     text: "Completed Normalization",  time: "Yesterday" },
  { tag: "Goal",     text: "Added monthly DSA target", time: "Yesterday" },
  { tag: "Aptitude", text: "Completed 20 questions",   time: "2 days ago" },
];

// Reusable small components to keep code short
function Card({ children, className = "" }) {
  return <div className={`bg-slate-800 border border-slate-700 rounded-xl p-5 ${className}`}>{children}</div>;
}
function ProgressBar({ pct }) {
  return (
    <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: pct + "%" }} />
    </div>
  );
}

function Dashboard() {
  const [checked, setChecked] = useState([false, false, false, false]);
  const toggle = (i) => { const c = [...checked]; c[i] = !c[i]; setChecked(c); };
  const doneCount = checked.filter(Boolean).length;

  // Get the logged-in user's name from localStorage
  const savedUser = JSON.parse(localStorage.getItem("placetrack_user"));
  const userName  = savedUser ? savedUser.name : "Student";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-7">
          <div><h2 className="text-base font-semibold">Dashboard</h2><p className="text-xs text-slate-400">Your placement preparation overview</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">{userInitial}</div>
        </header>

        <main className="max-w-5xl mx-auto p-7">
          <div className="mb-6"><h1 className="text-2xl font-bold text-slate-100">Welcome back, {userName} 👋</h1><p className="text-slate-400 text-sm mt-1">Here is your current preparation status.</p></div>

          {/* Stat Cards */}
          <section className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: "Overall Readiness", val: "72%", extra: <ProgressBar pct={72} /> },
              { label: "DSA Problems", val: "42 / 65", extra: <span className="text-xs text-slate-400">23 remaining</span> },
              { label: "Study Hours", val: "18 hrs", extra: <span className="text-xs text-slate-400">This week</span> },
              { label: "Current Streak", val: "5 days", extra: <span className="text-xs text-slate-400">Best: 11 days</span> },
            ].map((s) => (
              <Card key={s.label}><p className="text-xs text-slate-400">{s.label}</p><h2 className="text-2xl font-bold text-slate-100 mt-1">{s.val}</h2>{s.extra}</Card>
            ))}
          </section>

          {/* Tasks + Activity */}
          <section className="grid grid-cols-2 gap-5 mb-5">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-slate-100">Today's Tasks</h2>
                <span className="text-xs text-slate-400">{doneCount}/{tasks.length} completed</span>
              </div>
              <div className="flex flex-col gap-2">
                {tasks.map((t, i) => (
                  <label key={i} className="flex gap-3 items-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="accent-purple-500" />
                    <span className={checked[i] ? "line-through text-slate-500" : ""}>{t}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="font-semibold text-slate-100 mb-4">Recent Activity</h2>
              {activity.map((a, i) => (
                <div key={i} className="grid grid-cols-[70px_1fr_65px] gap-2 py-2 border-b border-slate-700 text-sm last:border-0">
                  <strong className="text-indigo-400">{a.tag}</strong>
                  <span className="text-slate-300">{a.text}</span>
                  <small className="text-slate-500 text-right">{a.time}</small>
                </div>
              ))}
            </Card>
          </section>

          {/* Preparation Progress */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-slate-100">Preparation Progress</h2>
              <Link to="/placement" className="text-indigo-400 text-sm">View details →</Link>
            </div>
            {progress.map((p) => (
              <div key={p.label} className="grid grid-cols-[120px_1fr_45px] items-center gap-3 mt-3 text-sm text-slate-300">
                <span>{p.label}</span>
                <ProgressBar pct={p.pct} />
                <strong className="text-right text-purple-400">{p.pct}%</strong>
              </div>
            ))}
          </Card>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
