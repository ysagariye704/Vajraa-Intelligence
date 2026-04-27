import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const growthData = [
  { month: 'Jan', leads: 45 },
  { month: 'Feb', leads: 62 },
  { month: 'Mar', leads: 78 },
  { month: 'Apr', leads: 91 },
  { month: 'May', leads: 108 },
  { month: 'Jun', leads: 122 },
];

const revenueData = [
  { month: 'Jan', revenue: 28 },
  { month: 'Feb', revenue: 40 },
  { month: 'Mar', revenue: 55 },
  { month: 'Apr', revenue: 68 },
  { month: 'May', revenue: 88 },
  { month: 'Jun', revenue: 105 },
];

const conversionData = [
  { name: 'Closed', value: 48 },
  { name: 'Qualified', value: 32 },
  { name: 'Pending', value: 20 },
];

const palette = ['#2563eb', '#0ea5e9', '#38bdf8'];

function ChartSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Leads Growth</p>
            <p className="mt-2 text-2xl font-semibold text-white">Monthly trend</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
              <Line type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Revenue</p>
          <p className="mt-2 text-2xl font-semibold text-white">Performance bar chart</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-glow">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Conversion</p>
          <p className="mt-2 text-2xl font-semibold text-white">Channel mix</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={conversionData} innerRadius={52} outerRadius={92} dataKey="value" stroke="none">
                {conversionData.map((entry, index) => (
                  <Cell key={entry.name} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
