import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Save } from 'lucide-react';

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Vajraa Intelligence',
    siteEmail: 'admin@varaa.ai',
    sitePhone: '+91 XXXXXXXXXX',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false,
    allowNewRegistrations: true,
    maxLoginAttempts: 5,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Configuration</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Admin Settings</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Configure global settings and preferences for your application.</p>
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
        <form className="space-y-6 max-w-2xl">
          {/* Site Name */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Site Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Site Email</label>
            <input
              type="email"
              name="siteEmail"
              value={settings.siteEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Site Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Site Phone</label>
            <input
              type="tel"
              name="sitePhone"
              value={settings.sitePhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Timezone</label>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option>UTC</option>
              <option>Asia/Kolkata</option>
              <option>Asia/Bangkok</option>
              <option>Asia/Singapore</option>
              <option>Asia/Dubai</option>
              <option>Europe/London</option>
              <option>America/New_York</option>
            </select>
          </div>

          {/* Max Login Attempts */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Max Login Attempts</label>
            <input
              type="number"
              name="maxLoginAttempts"
              value={settings.maxLoginAttempts}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Maintenance Mode */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="maintenanceMode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="w-4 h-4 rounded text-brand-500 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            />
            <label htmlFor="maintenanceMode" className="text-sm font-medium text-slate-200 cursor-pointer">
              Enable Maintenance Mode (users cannot login)
            </label>
          </div>

          {/* Allow New Registrations */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="allowNewRegistrations"
              name="allowNewRegistrations"
              checked={settings.allowNewRegistrations}
              onChange={handleChange}
              className="w-4 h-4 rounded text-brand-500 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            />
            <label htmlFor="allowNewRegistrations" className="text-sm font-medium text-slate-200 cursor-pointer">
              Allow new user registrations
            </label>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition"
            >
              <Save size={20} />
              Save Settings
            </button>
            {saved && (
              <span className="text-green-400 font-medium flex items-center">✓ Saved successfully</span>
            )}
          </div>
        </form>
      </section>

      {/* Info Box */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <h3 className="text-xl font-semibold text-white mb-4">About Settings</h3>
        <p className="text-slate-300 mb-2">
          Use this settings page to configure global application preferences:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
          <li><strong>Site Name:</strong> The name displayed in headers and emails</li>
          <li><strong>Site Email:</strong> Primary contact email for notifications</li>
          <li><strong>Site Phone:</strong> Contact phone number displayed to users</li>
          <li><strong>Timezone:</strong> Server timezone for timestamps and scheduling</li>
          <li><strong>Max Login Attempts:</strong> Number of failed attempts before account lockout</li>
          <li><strong>Maintenance Mode:</strong> Temporarily disable access during maintenance</li>
          <li><strong>Allow New Registrations:</strong> Control whether new users can sign up</li>
        </ul>
      </section>
    </div>
  );
}

export default AdminSettings;
