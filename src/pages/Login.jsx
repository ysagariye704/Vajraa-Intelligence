import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setInfo(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      const authUser = {
        name: data.name || (data.role === 'admin' ? 'Admin' : ''),
        email: data.email || email,
        role: data.role,
        user_id: data.user_id || null,
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));
      window.dispatchEvent(new Event('authChange'));

      const targetPath = data.role === 'admin' ? '/app-admin/dashboard' : '/afterlogin';
      navigate(targetPath, { replace: true, state: { message: 'You login successfully.' } });
    } catch (error) {
      setError('Unable to connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Login</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Access your dashboard.</h1>
      <p className="mt-3 text-slate-400">Sign in using your Vajraa Intelligence account.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Email or username</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com or username"
            className="w-full px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {info && <p className="text-sm text-emerald-300">{info}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/forgot-password" className="hover:text-white">
          Forgot password?
        </Link>
        <p>
          New here?{' '}
          <Link to="/signup" className="text-brand-300 hover:text-brand-200">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
