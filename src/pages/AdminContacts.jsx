import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Trash2, Star, Download } from 'lucide-react';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterRead, setFilterRead] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [page, search, filterRead]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });
      if (filterRead) params.append('is_read', filterRead);

      const res = await fetch(`${API_BASE_URL}/api/admin/contacts-advanced/?${params}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.messages);
        setTotal(data.total);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/contacts/delete/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.filter(c => c.id !== id));
        setTotal(total - 1);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleToggleRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/contacts/read/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map(c => c.id === id ? { ...c, is_read: data.is_read } : c));
      }
    } catch (err) {
      console.error('Error toggling read:', err);
    }
  };

  const handleToggleImportant = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/contacts/important/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: id }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map(c => c.id === id ? { ...c, is_important: data.is_important } : c));
      }
    } catch (err) {
      console.error('Error toggling important:', err);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Message', 'Read', 'Important', 'Date'];
    const rows = contacts.map(c => [
      c.name,
      c.email,
      c.message.replace(/,/g, ';').replace(/"/g, '""'),
      c.is_read ? 'Yes' : 'No',
      c.is_important ? 'Yes' : 'No',
      new Date(c.created_at).toLocaleDateString('en-IN'),
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Contact messages</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">All inbound contact requests</h1>
            <p className="mt-3 max-w-2xl text-slate-400">List of messages submitted through the contact form, sorted by most recent.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-100 transition hover:border-green-500 hover:text-green-300 flex items-center gap-2"
            >
              <Download size={16} /> Export CSV
            </button>
            <Link
              to="/app-admin/dashboard"
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-100 transition hover:border-brand-500 hover:text-white"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <select
            value={filterRead}
            onChange={(e) => {
              setFilterRead(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">All Messages</option>
            <option value="false">Unread Only</option>
            <option value="true">Read Only</option>
          </select>
        </div>

        {loading ? (
          <p className="text-slate-300">Loading messages...</p>
        ) : contacts.length === 0 ? (
          <p className="text-slate-400">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`rounded-3xl border p-6 transition ${
                  contact.is_read
                    ? 'border-slate-800 bg-slate-900/80'
                    : 'border-blue-700 bg-blue-950/40'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-white">{contact.name}</h3>
                      {contact.is_important && (
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">★ Important</span>
                      )}
                      {!contact.is_read && (
                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">Unread</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{contact.email}</p>
                    <p className="text-slate-300 mt-3">{contact.message}</p>
                    <p className="text-xs text-slate-500 mt-3">
                      {new Date(contact.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleRead(contact.id)}
                      title={contact.is_read ? 'Mark unread' : 'Mark read'}
                      className={`p-2 rounded-lg transition ${
                        contact.is_read
                          ? 'bg-green-900/50 text-green-300 hover:bg-green-800/70'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleImportant(contact.id)}
                      title={contact.is_important ? 'Remove important' : 'Mark important'}
                      className={`p-2 rounded-lg transition ${
                        contact.is_important
                          ? 'bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800/70'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <Star size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 rounded-lg bg-red-900/50 text-red-300 hover:bg-red-800/70 transition"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default AdminContacts;
