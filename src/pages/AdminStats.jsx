import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';

function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/statistics/');
      const data = await res.json();
      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Analytics</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Dashboard Statistics</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Real-time insights into user activity and engagement metrics.</p>
          </div>
          <Link
            to="/app-admin/dashboard"
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-100 transition hover:border-brand-500 hover:text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading statistics...</p>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.total_users}</p>
              </div>
              <Users className="text-brand-400" size={32} />
            </div>
          </div>

          {/* Logged In Users */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Logged In Users</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.logged_in_users}</p>
              </div>
              <TrendingUp className="text-green-400" size={32} />
            </div>
          </div>

          {/* Total Messages */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.total_messages}</p>
              </div>
              <MessageSquare className="text-blue-400" size={32} />
            </div>
          </div>

          {/* Unread Messages */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Unread Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.unread_messages}</p>
              </div>
              <Calendar className="text-yellow-400" size={32} />
            </div>
          </div>

          {/* Important Messages */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Important Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.important_messages}</p>
              </div>
              <MessageSquare className="text-red-400" size={32} />
            </div>
          </div>

          {/* Today's Users */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today's New Users</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.today_users}</p>
              </div>
              <Users className="text-purple-400" size={32} />
            </div>
          </div>

          {/* Today's Messages */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today's Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.today_messages}</p>
              </div>
              <MessageSquare className="text-pink-400" size={32} />
            </div>
          </div>

          {/* 7-Day Users */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Last 7 Days Users</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.users_7_days}</p>
              </div>
              <Users className="text-indigo-400" size={32} />
            </div>
          </div>

          {/* 7-Day Messages */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Last 7 Days Messages</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.messages_7_days}</p>
              </div>
              <MessageSquare className="text-cyan-400" size={32} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-400">Unable to load statistics.</p>
      )}
    </div>
  );
}

export default AdminStats;
