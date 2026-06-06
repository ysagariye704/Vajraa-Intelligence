import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AfterLoginHome() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  return (
    <section className="space-y-10">
      {message && (
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-slate-100">
          {message}
        </div>
      )}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Welcome back</p>
          <h1 className="text-4xl font-semibold text-white">Your logged in home.</h1>
          <p className="max-w-2xl text-slate-400">
            You are now signed in. Use the navigation above to access About, Profile, and other pages.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Name</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.name || 'User'}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.email || 'No email available'}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Role</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.role || 'user'}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/profile"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
          >
            Go to profile
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-100 transition hover:border-brand-500"
          >
            About
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AfterLoginHome;
