function Settings() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Settings</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Manage your profile and subscription.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
          <h2 className="text-2xl font-semibold text-white">Profile</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Name</label>
              <input type="text" placeholder="Anna Kumar" className="w-full px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">Email</label>
              <input type="email" placeholder="anna@company.com" className="w-full px-4 py-3" />
            </div>
            <button className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Save profile
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Change password</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Current password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">New password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3" />
              </div>
              <button className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
                Update password
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-white">Subscription</h2>
            <p className="mt-4 text-slate-300">Growth plan with AI insights, automated reporting, and lead scoring.</p>
            <div className="mt-6 rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Current plan</p>
              <p className="mt-2 text-3xl font-semibold text-white">Growth</p>
              <p className="mt-1 text-slate-400">Next billing: May 30</p>
            </div>
            <button className="mt-6 w-full rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-500">
              Change plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
