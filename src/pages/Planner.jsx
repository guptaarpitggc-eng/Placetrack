// Planner.jsx — Weekly Study Planner page
import Sidebar from "../Sidebar";
import useUser from "../useUser";

const weekPlan = [
  { day: "Monday",    items: [{ sub: "DSA", time: "1 hour" }, { sub: "DBMS", time: "45 min" }, { sub: "Aptitude", time: "30 min" }] },
  { day: "Tuesday",   items: [{ sub: "DSA", time: "1 hour" }, { sub: "Operating System", time: "45 min" }, { sub: "Coding", time: "30 min" }] },
  { day: "Wednesday", items: [{ sub: "DSA", time: "1 hour" }, { sub: "CN", time: "45 min" }, { sub: "Aptitude", time: "30 min" }] },
  { day: "Thursday",  items: [{ sub: "DBMS", time: "1 hour" }, { sub: "DSA", time: "45 min" }] },
  { day: "Friday",    items: [{ sub: "DSA", time: "1 hour" }, { sub: "OOP", time: "45 min" }] },
  { day: "Saturday",  items: [{ sub: "Mock Test", time: "1 hour" }, { sub: "Revision", time: "1 hour" }] },
  { day: "Sunday",    items: [{ sub: "Weekly Revision", time: "1 hour" }] },
];

function Planner() {
  const { initial } = useUser();
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-7">
          <div><h2 className="text-base font-semibold">Study Planner</h2><p className="text-xs text-slate-400">Plan your preparation week</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">{initial}</div>
        </header>

        <main className="max-w-5xl mx-auto p-7">
          <div className="mb-6"><h1 className="text-2xl font-bold text-slate-100">Weekly Study Plan</h1><p className="text-slate-400 text-sm mt-1">Organize your preparation time.</p></div>

          <section className="grid grid-cols-3 gap-4">
            {weekPlan.map((day) => (
              <div key={day.day} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h2 className="font-semibold text-purple-400 mb-3">{day.day}</h2>
                {day.items.map((item, i) => (
                  <div key={i} className="flex justify-between border-t border-slate-700 py-2 text-sm">
                    <b className="text-slate-200">{item.sub}</b>
                    <span className="text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
export default Planner;
