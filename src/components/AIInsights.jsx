const insights = [
  { title: 'Revenue forecast', description: 'Revenue can increase by 15% with the next campaign.' },
  { title: 'Top campaign', description: 'Best campaign detected: AI outreach boosted conversions.' },
  { title: 'Priority lead', description: 'Focus on Client B for quickest pipeline win.' },
];

function AIInsights() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {insights.map((item) => (
        <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Insight</p>
          <p className="mt-4 text-xl font-semibold text-white">{item.title}</p>
          <p className="mt-3 text-slate-300">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AIInsights;
