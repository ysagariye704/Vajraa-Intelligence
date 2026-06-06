import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Users, MessageSquare, TrendingUp } from 'lucide-react';

function AdmNavbar() {
  const [summary, setSummary] = useState({ total_users: 0, logged_in_users: 0, today_users: 0, today_messages: 0 });
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/statistics/');
        const data = await res.json();
        if (data.success) {
          setSummary({
            total_users: data.total_users,
            logged_in_users: data.logged_in_users,
            today_users: data.today_users,
            today_messages: data.today_messages,
          });
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
    const interval = setInterval(fetchSummary, 60000);
    return () => clearInterval(interval);
  }, []);

  const getBreadcrumb = () => {
    const path = location.pathname;
    let label = 'Dashboard';

    if (path.includes('users')) label = 'Users';
    else if (path.includes('contacts')) label = 'Contacts';
    else if (path.includes('statistics')) label = 'Statistics';
    else if (path.includes('activity-logs')) label = 'Activity Logs';
    else if (path.includes('settings')) label = 'Settings';

    return label;
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(15,23,42,0.35)]">
      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-100">
            Admin
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-300">Admin dashboard</p>
            <p className="text-sm text-slate-300">{today}</p>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <NavLink
            to="/app-admin/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/app-admin/users"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/app-admin/contacts"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="/app-admin/statistics"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to="/app-admin/activity-logs"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Activity
          </NavLink>
          <NavLink
            to="/app-admin/settings"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
            }
          >
            Settings
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="border-t border-slate-800/50 bg-slate-950/50 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-brand-400" />
            <span className="text-slate-300">
              Total users: <span className="font-semibold text-white">{summary.total_users}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-slate-300">
              Online: <span className="font-semibold text-white">{summary.logged_in_users}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-400" />
            <span className="text-slate-300">
              Today: <span className="font-semibold text-white">{summary.today_users}</span> new
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-blue-400" />
            <span className="text-slate-300">
              Messages: <span className="font-semibold text-white">{summary.today_messages}</span> today
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-t border-slate-800/50 bg-slate-950/30 px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <NavLink to="/app-admin/dashboard" className="text-slate-400 hover:text-slate-200 transition">
            Dashboard
          </NavLink>
          <ChevronRight size={16} className="text-slate-600" />
          <span className="text-slate-200 font-medium">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="mx-auto grid max-w-7xl gap-2 px-4 pb-4 text-sm text-slate-300 lg:hidden sm:px-6">
        <NavLink
          to="/app-admin/dashboard"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/app-admin/users"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/app-admin/contacts"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/app-admin/statistics"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Statistics
        </NavLink>
        <NavLink
          to="/app-admin/activity-logs"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Activity
        </NavLink>
        <NavLink
          to="/app-admin/settings"
          className={({ isActive }) =>
            `block rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 transition ${isActive ? 'text-brand-300' : 'text-slate-300 hover:text-white'}`
          }
        >
          Settings
        </NavLink>
      </div>
    </header>
  );
}

export default AdmNavbar;
