import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="space-y-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">About Vajraa Intelligence</p>
        <h1 className="text-4xl font-semibold text-white">Data-driven outbound and lead generation for US SaaS.</h1>
        <p className="text-slate-300 leading-8">
          Vajraa Intelligence is a data-driven outbound and lead generation agency focused on helping US SaaS companies build a consistent pipeline of qualified sales calls.
        </p>
        <p className="text-slate-300 leading-8">We don’t believe in spam or mass outreach.</p>
        <p className="text-slate-300 leading-8">
          Instead, we use a combination of AI-assisted systems and human-driven personalization to identify the right prospects, start meaningful conversations, and convert them into booked meetings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">🎯 What we do</p>
          <p className="mt-4 text-slate-300">We help SaaS founders:</p>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Generate high-quality leads</li>
            <li>• Improve response rates from outbound</li>
            <li>• Build structured follow-up systems</li>
            <li>• Book 15–25 qualified sales calls per month</li>
          </ul>
          <p className="mt-4 text-slate-500">Without hiring additional SDRs or wasting time on unqualified prospects.</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-300">👤 Founder</p>
          <p className="mt-4 text-white font-semibold">Yash Sagariye</p>
          <p className="mt-3 text-slate-300">Vajraa Intelligence was founded by Yash Sagariye, a sales and business development professional with 3+ years of experience in lead generation and outbound sales.</p>
          <p className="mt-4 text-slate-500">His approach is simple: Focus on conversations, not just outreach. By combining AI efficiency with human understanding, he helps companies create predictable and scalable outbound systems.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">🚀 Our approach</p>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>• Quality over quantity</li>
          <li>• Personalization over automation</li>
          <li>• Conversations over cold selling</li>
          <li>• Results over vanity metrics</li>
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">💬 Why Vajraa Intelligence</p>
        <p className="mt-4 text-slate-300">Most outbound fails because it’s generic.</p>
        <p className="mt-4 text-slate-300">We fix that by:</p>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>• Targeting the right audience</li>
          <li>• Crafting personalized messaging</li>
          <li>• Building consistent follow-up systems</li>
        </ul>
        <p className="mt-4 text-slate-500">So you don’t just get leads — you get qualified conversations that convert.</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/contact" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
          Contact us
        </Link>
        <Link to="/signup" className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-100 transition hover:border-brand-500">
          Get started
        </Link>
      </div>
    </section>
  );
}

export default About;
