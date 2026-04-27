function StatsCard({ label, value, trend }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow transition hover:-translate-y-1 hover:border-brand-500">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{trend}</p>
    </div>
  );
}

export default StatsCard;
