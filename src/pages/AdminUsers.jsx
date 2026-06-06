import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trash2, LogOut } from 'lucide-react';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });

      const res = await fetch(`http://127.0.0.1:8000/api/admin/users-advanced/?${params}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setTotal(data.total);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this user? This action cannot be undone.')) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/users/delete/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u.id !== id));
        setTotal(total - 1);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Total users</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">User list and login details</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Review every registered user, their login status, and join date in one place.</p>
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
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {loading ? (
          <p className="text-slate-300">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
              <thead className="bg-slate-950/90 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 hidden md:table-cell">Last login</th>
                  <th className="px-6 py-4 hidden md:table-cell">Joined</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-800/70 hover:bg-slate-900/60 transition">
                    <td className="px-6 py-4 text-white font-semibold">{user.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-slate-300 break-all text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-brand-300 hidden md:table-cell text-sm">
                      {user.last_login ? new Date(user.last_login).toLocaleString('en-IN') : 'Never logged in'}
                    </td>
                    <td className="px-6 py-4 text-slate-300 hidden md:table-cell text-sm">
                      {new Date(user.date_joined).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.is_superuser ? 'bg-red-900/50 text-red-300' :
                        user.is_staff ? 'bg-orange-900/50 text-orange-300' :
                        'bg-green-900/50 text-green-300'
                      }`}>
                        {user.is_superuser ? 'Superuser' : user.is_staff ? 'Staff' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg bg-red-900/50 text-red-300 hover:bg-red-800/70 transition"
                        title="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default AdminUsers;
