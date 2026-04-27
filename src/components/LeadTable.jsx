const leads = [
  { id: 1, name: 'Client A', status: 'New', source: 'Web', value: '$8.2K' },
  { id: 2, name: 'Client B', status: 'Closed', source: 'Email', value: '$14.5K' },
  { id: 3, name: 'Client C', status: 'Qualified', source: 'Referral', value: '$6.7K' },
];

function LeadTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-glow">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Leads</p>
            <p className="mt-1 text-lg font-semibold text-white">Lead management</p>
          </div>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
            Add lead
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
          <thead className="bg-slate-950/90 text-slate-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                <td className="px-6 py-4">{lead.name}</td>
                <td className="px-6 py-4 text-brand-300">{lead.status}</td>
                <td className="px-6 py-4">{lead.source}</td>
                <td className="px-6 py-4">{lead.value}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:border-brand-500">
                      Edit
                    </button>
                    <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:border-red-500">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadTable;
