import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function AlNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const readAuthUser = () => {
    const saved = localStorage.getItem('authUser');
    setUser(saved ? JSON.parse(saved) : null);
  };

  useEffect(() => {
    readAuthUser();
    window.addEventListener('authChange', readAuthUser);
    return () => window.removeEventListener('authChange', readAuthUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'UI';

  const menuLinks = [
    { to: '/afterlogin', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(15,23,42,0.35)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/profile" className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-2 transition hover:border-brand-500">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-brand-500 text-lg font-semibold text-slate-950 shadow-lg shadow-brand-500/20">
            {user.profile_image_url ? (
              <img src={user.profile_image_url} alt="Profile avatar" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-300">Profile</span>
            <span className="text-sm font-semibold text-white">{user.name || 'Your profile'}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menuLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand-500 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 px-4 pb-4 text-sm text-slate-300 md:hidden sm:px-6">
        {menuLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

export default AlNavbar;
