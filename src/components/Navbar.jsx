import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard' },
];

function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <img src={logo} alt="Vajraa Intelligence logo" className="h-10 w-10 rounded-2xl border border-slate-800 bg-slate-950 p-1 shadow-glow" />
          Vajraa Intelligence
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menuLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive ? 'text-brand-500' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition hover:border-brand-500 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
