import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 px-4 py-8 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-100">VAJRAA Intelligence</p>
          <p className="mt-2 text-sm">Global AI-powered revenue intelligence for B2B organizations.</p>
          <p className="mt-4 text-sm text-slate-400">Founder: Yash Sagariye</p>
          <p className="text-sm text-slate-400">Ivajraa@gmail.com | +91 99244 61429</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
