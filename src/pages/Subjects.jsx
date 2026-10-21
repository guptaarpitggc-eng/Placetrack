// Subjects.jsx — CS Fundamentals page
import Sidebar from "../Sidebar";
import useUser from "../useUser";

const subjects = [
  { name: "DBMS",                  pct: 75, done: 6, total: 8 },
  { name: "Operating System",      pct: 60, done: 6, total: 10 },
  { name: "Computer Networks",     pct: 50, done: 5, total: 10 },
  { name: "OOP",                   pct: 65, done: 7, total: 10 },
  { name: "Computer Architecture", pct: 45, done: 4, total: 9 },
  { name: "Software Engineering",  pct: 70, done: 7, total: 10 },
];

function Subjects() {
  const { initial } = useUser();
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-7">
          <div><h2 className="text-base font-semibold">Subjects</h2><p className="text-xs text-slate-400">Core technical preparation</p></div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">{initial}</div>
        </header>

        <main className="max-w-5xl mx-auto p-7">
          <div className="mb-6"><h1 className="text-2xl font-bold text-slate-100">CS Fundamentals</h1><p className="text-slate-400 text-sm mt-1">Prepare subjects commonly asked in technical interviews.</p></div>

          <section className="grid grid-cols-2 gap-4">
            {subjects.map((s) => (
              <div key={s.name} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-slate-100">{s.name}</h2>
                  <strong className="text-purple-400">{s.pct}%</strong>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: s.pct + "%" }} />
                </div>
                <p className="text-xs text-slate-400 mt-3">{s.done} of {s.total} topics completed</p>
                <a href="#" className="text-indigo-400 text-sm mt-2 inline-block hover:underline">View Topics →</a>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
export default Subjects;
