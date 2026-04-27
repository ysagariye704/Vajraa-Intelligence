import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const initialLeads = [
  { id: 1, name: 'Client A', company: 'Launch Labs', status: 'New', value: '$8.2K' },
  { id: 2, name: 'Client B', company: 'EdgeWorks', status: 'Qualified', value: '$14.5K' },
  { id: 3, name: 'Client C', company: 'Nimbus', status: 'Closed', value: '$6.7K' },
];

function AdminDashboard() {
  const [leads, setLeads] = useState(initialLeads);
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [draftLead, setDraftLead] = useState({ name: '', company: '', status: '', value: '' });
  const [message, setMessage] = useState('');
  const [adminStats, setAdminStats] = useState({ total_users: 0, logged_in_users: 0, total_messages: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await fetch('/api/admin/summary/');
        const data = await response.json();
        if (response.ok && data.success) {
          setAdminStats((prev) => ({
            ...prev,
            total_users: data.total_users,
            logged_in_users: data.logged_in_users,
          }));
        }

        const messagesResponse = await fetch('/api/admin/contacts/');
        const messagesData = await messagesResponse.json();
        if (messagesResponse.ok && messagesData.success) {
          setAdminStats((prev) => ({ ...prev, total_messages: messagesData.messages.length }));
        }
      } catch (error) {
        // ignore silently for dashboard; user pages will show details.
      } finally {
        setStatsLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const stats = [
    { label: 'Total users', value: adminStats.total_users },
    { label: 'Users logged in', value: adminStats.logged_in_users },
    { label: 'Contact messages', value: adminStats.total_messages },
    { label: 'Active leads', value: leads.length },
  ];

  const handleDelete = (id) => {
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setMessage('Lead deleted successfully.');
  };

  const handleEdit = (lead) => {
    setEditingLeadId(lead.id);
    setDraftLead({ name: lead.name, company: lead.company, status: lead.status, value: lead.value });
    setMessage('');
  };

  const handleSave = () => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === editingLeadId
          ? { ...lead, name: draftLead.name, company: draftLead.company, status: draftLead.status, value: draftLead.value }
          : lead
      )
    );
    setEditingLeadId(null);
    setMessage('Lead updated successfully.');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Admin Console</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Site administration hub</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Manage users, review contact requests, and update leads from one place.</p>
          </div>
          <Link
            to="/"
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-100 transition hover:border-brand-500 hover:text-white"
          >
            Back to website
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{statsLoading ? 'Loading...' : stat.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Lead management</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Only admin can edit or delete leads</h2>
          </div>
          <p className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">{leads.length} leads available</p>
        </div>

        {message && <p className="mt-6 rounded-3xl bg-slate-900/80 p-4 text-sm text-emerald-300">{message}</p>}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
            <thead className="bg-slate-950/90 text-slate-400">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-800/70 hover:bg-slate-900/60">
                  <td className="px-6 py-4">{lead.name}</td>
                  <td className="px-6 py-4">{lead.company}</td>
                  <td className="px-6 py-4 text-brand-300">{lead.status}</td>
                  <td className="px-6 py-4">{lead.value}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(lead)}
                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:border-brand-500"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(lead.id)}
                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:border-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editingLeadId && (
        <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
          <h2 className="text-2xl font-semibold text-white">Edit lead details</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Lead name</label>
              <input
                type="text"
                value={draftLead.name}
                onChange={(event) => setDraftLead((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full px-4 py-3"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Company</label>
              <input
                type="text"
                value={draftLead.company}
                onChange={(event) => setDraftLead((prev) => ({ ...prev, company: event.target.value }))}
                className="w-full px-4 py-3"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Status</label>
              <select
                value={draftLead.status}
                onChange={(event) => setDraftLead((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full px-4 py-3"
              >
                <option>New</option>
                <option>Qualified</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Deal value</label>
              <input
                type="text"
                value={draftLead.value}
                onChange={(event) => setDraftLead((prev) => ({ ...prev, value: event.target.value }))}
                className="w-full px-4 py-3"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => setEditingLeadId(null)}
              className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-brand-500"
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
