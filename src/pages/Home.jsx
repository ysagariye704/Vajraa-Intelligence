import { Link } from 'react-router-dom';

const features = [
  { title: 'Global Market Entry', description: 'US & UK compliant outreach and client acquisition strategies.' },
  { title: 'AI Revenue Intelligence', description: 'Predictable, compliant, and scalable growth pipelines.' },
  { title: 'SaaS MVP Development', description: 'Build AI-driven revenue intelligence platforms.' },
];

const testimonials = [
  { name: 'Meera Gupta', role: 'Growth Lead', quote: 'VAJRAA helped us establish a global presence with compliant strategies.' },
  { name: 'Rahul Sharma', role: 'Sales Head', quote: 'The roadmap provided clear phases for international expansion.' },
];

function Home() {
  return (
    <section className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-500/20 px-4 py-1 text-sm font-semibold text-brand-200">Global Expansion Roadmap</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">VAJRAA Intelligence – Global Expansion Roadmap</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">US & UK Market Entry | Verification | International Registration. Build a globally trusted AI-powered revenue intelligence company.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Get Started
            </Link>
            <Link to="/contact" className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-100 transition hover:border-brand-500">
              Book Demo
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
          <div className="space-y-6 text-slate-200">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Phase 1: Foundation</p>
              <p className="mt-4 text-3xl font-semibold text-white">Legal Presence & Compliance</p>
              <p className="mt-2 text-slate-400">Register UK LTD, set up banking, launch website with GDPR.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-sm text-slate-400">Market Entry</p>
                <p className="mt-3 text-2xl font-semibold text-white">US & UK</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-sm text-slate-400">Client Acquisition</p>
                <p className="mt-3 text-2xl font-semibold text-white">1-2 Retainers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <h2 className="text-2xl font-semibold text-white">Features that accelerate every stage</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-brand-500">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((item) => (
          <div key={item.name} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
            <p className="text-lg text-slate-200">“{item.quote}”</p>
            <div className="mt-6 text-sm text-slate-400">
              <p className="font-semibold text-white">{item.name}</p>
              <p>{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
