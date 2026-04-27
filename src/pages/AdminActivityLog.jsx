import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function AdminActivityLog() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/activity-logs/?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        setTotal(data.total);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
    setLoading(false);
  };

  const getActionColor = (action) => {
    const colors = {
      'login': 'text-green-400 bg-green-900/30',
      'logout': 'text-blue-400 bg-blue-900/30',
      'user_created': 'text-purple-400 bg-purple-900/30',
      'message_read': 'text-cyan-400 bg-cyan-900/30',
      'message_deleted': 'text-red-400 bg-red-900/30',
      'user_deleted': 'text-red-600 bg-red-950/30',
      'user_updated': 'text-yellow-400 bg-yellow-900/30',
      'settings_changed': 'text-orange-400 bg-orange-900/30',
    };
    return colors[action] || 'text-slate-400 bg-slate-900/30';
  };

  const getActionLabel = (action) => {
    const labels = {
      'login': 'Login',
      'logout': 'Logout',
      'user_created': 'User Created',
      'message_read': 'Message Read',
      'message_deleted': 'Message Deleted',
      'user_deleted': 'User Deleted',
      'user_updated': 'User Updated',
      'settings_changed': 'Settings Changed',
    };
    return labels[action] || action;
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Activity</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Activity Log</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Timeline of all admin and user actions in the system.</p>
          </div>
          <Link
            to="/app-admin/dashboard"
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-100 transition hover:border-brand-500 hover:text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        {loading ? (
          <p className="text-slate-300">Loading activity logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-400">No activity logs found.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, idx) => (
              <div
                key={log.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                    {getActionLabel(log.action)}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-200">
                      <span className="font-semibold text-white">{log.user}</span>
                      {log.description && ` - ${log.description}`}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(log.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-slate-700 hover:border-brand-500 text-slate-300 hover:text-white disabled:opacity-50 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-slate-300">
              Page {page} of {totalPages} ({total} total)
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-slate-700 hover:border-brand-500 text-slate-300 hover:text-white disabled:opacity-50 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminActivityLog;
