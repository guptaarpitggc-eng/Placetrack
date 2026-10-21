// Goals.jsx — My Goals page
import Sidebar from "../Sidebar";
import useUser from "../useUser";

const goals = [
  { title: "Solve 50 DSA problems",             period: "Monthly target",    progress: "42 / 50",   done: false },
  { title: "Complete DBMS revision",             period: "Weekly target",     progress: "Completed", done: true  },
  { title: "Practice aptitude five days a week", period: "Weekly target",     progress: "3 / 5 days",done: false },
  { title: "Complete one mock interview",         period: "Before next month", progress: "Pending",   done: false },
];

function Goals() {
  const { initial } = useUser();
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-7">
          <div><h2 className="text-base font-semibold">Goals</h2><p className="text-xs text-slate-400">Manage preparation targets</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">{initial}</div>
        </header>

        <main className="max-w-5xl mx-auto p-7">
          <div className="flex justify-between items-center mb-6">
            <div><h1 className="text-2xl font-bold text-slate-100">My Goals</h1><p className="text-slate-400 text-sm mt-1">Set daily, weekly and monthly targets.</p></div>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Add Goal</button>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl">
            {goals.map((g, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-slate-100">{g.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{g.period}</p>
                </div>
                <span className={`text-sm font-semibold ${g.done ? "text-green-400" : "text-indigo-400"}`}>{g.progress}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Goals;
