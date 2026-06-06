import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import ChartSection from '../components/ChartSection';
import LeadTable from '../components/LeadTable';
import AIInsights from '../components/AIInsights';

function Dashboard() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    setUser(saved ? JSON.parse(saved) : null);
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Dashboard</p>
          <h2 className="text-2xl font-semibold text-white">Revenue HQ</h2>
        </div>
        <nav className="space-y-2 text-sm text-slate-300">
          <Link className="block rounded-2xl px-4 py-3 transition hover:bg-slate-900 hover:text-white" to="/dashboard">
            Overview
          </Link>
          <Link className="block rounded-2xl px-4 py-3 transition hover:bg-slate-900 hover:text-white" to="/dashboard#leads">
            Leads
          </Link>
          <Link className="block rounded-2xl px-4 py-3 transition hover:bg-slate-900 hover:text-white" to="/settings">
            Settings
          </Link>
        </nav>
        <div className="rounded-3xl bg-slate-900/80 p-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Plan</p>
          <p className="mt-2 text-lg font-semibold text-white">Growth</p>
          <p className="mt-1 text-slate-400">16 active campaigns</p>
        </div>
      </aside>

      <div className="space-y-8">
        {message && (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-slate-100">
            {message}
          </div>
        )}

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Welcome back</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Ready to improve your pipeline{user ? `, ${user.name || 'User'}` : ''}?
              </h1>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
              {user?.name || 'Guest'} • Product Analyst
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard label="Total Leads" value="428" trend="+18% from last week" />
          <StatsCard label="Revenue" value="$124.4K" trend="+12% month-over-month" />
          <StatsCard label="Conversion" value="22.7%" trend="Stable compared to last period" />
        </div>

        <ChartSection />

        <section id="leads" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Lead Management</p>
              <h2 className="text-2xl font-semibold text-white">Pipeline activity</h2>
            </div>
            <Link className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400" to="/contact">
              New lead request
            </Link>
          </div>
          <LeadTable />
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">AI insights</p>
            <h2 className="text-2xl font-semibold text-white">Recommendations</h2>
          </div>
          <AIInsights />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
