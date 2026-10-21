// Aptitude.jsx — Aptitude Preparation page
import Sidebar from "../Sidebar";
import useUser from "../useUser";

const categories = [
  { name: "Quantitative Aptitude", pct: 62, desc: "Percentages, profit and loss, time and work" },
  { name: "Logical Reasoning",     pct: 70, desc: "Series, coding, arrangements and puzzles" },
  { name: "Verbal Ability",        pct: 55, desc: "Grammar, vocabulary and reading comprehension" },
];

function Aptitude() {
  const { initial } = useUser();
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-7">
          <div><h2 className="text-base font-semibold">Aptitude</h2><p className="text-xs text-slate-400">Practice for placement tests</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">{initial}</div>
        </header>

        <main className="max-w-5xl mx-auto p-7">
          <div className="mb-6"><h1 className="text-2xl font-bold text-slate-100">Aptitude Preparation</h1><p className="text-slate-400 text-sm mt-1">Track quantitative, logical and verbal preparation.</p></div>

          {/* Stats */}
          <section className="grid grid-cols-3 gap-4 mb-5">
            {[["Questions Attempted", "120"], ["Correct Answers", "89"], ["Accuracy", "74%"]].map(([label, val]) => (
              <div key={label} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-xs text-slate-400">{label}</p>
                <h2 className="text-3xl font-bold text-slate-100 mt-1">{val}</h2>
              </div>
            ))}
          </section>

          {/* Category Cards */}
          <section className="grid grid-cols-2 gap-4">
            {categories.map((c) => (
              <div key={c.name} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-slate-100">{c.name}</h2>
                  <strong className="text-purple-400">{c.pct}%</strong>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: c.pct + "%" }} />
                </div>
                <p className="text-xs text-slate-400 mt-3">{c.desc}</p>
                <button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Practice</button>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
export default Aptitude;
