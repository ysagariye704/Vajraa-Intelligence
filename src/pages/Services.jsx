const services = [
  { title: 'Foundation & Verification', description: 'Register UK LTD, set up virtual address, banking, website with GDPR compliance.' },
  { title: 'Market Entry & Client Acquisition', description: 'Launch compliant outreach in US & UK, offer pilot programs, close retainers.' },
  { title: 'Scaling & Team Expansion', description: 'Document processes, hire SDRs, automate reporting, increase pricing.' },
  { title: 'SaaS MVP & US Expansion', description: 'Build AI-driven SaaS, register US LLC, form partnerships.' },
];

function Services() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Services</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">VAJRAA Intelligence Expansion Phases</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Our roadmap for global expansion: Foundation, Market Entry, Scaling, and SaaS MVP development.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service.title} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow transition hover:-translate-y-1 hover:border-brand-500">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">{service.title}</p>
            <p className="mt-4 text-slate-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
