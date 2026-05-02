import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Invalid credentials.');
        return;
      }

      const authUser = {
        name: data.name || (data.role === 'admin' ? 'Admin' : ''),
        email: data.email,
        role: data.role,
        user_id: data.user_id || null,
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));
      window.dispatchEvent(new Event('authChange'));
      const targetPath = data.role === 'admin' ? '/app-admin/dashboard' : '/afterlogin';
      navigate(targetPath, { replace: true, state: { message: 'You login successfully.' } });
    } catch (err) {
      setError('Unable to reach server.');
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Admin Login</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Sign in to the admin console.</h1>
      <p className="mt-3 text-slate-400">Sign in with your Django superuser credentials or admin account.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Email or username</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@varaa.ai or username"
            className="w-full px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="admin123"
            className="w-full px-4 py-3"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
          Sign in as admin
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Just testing the admin UI?{' '}
        <Link to="/" className="text-brand-300 hover:text-brand-200">
          Go back to home
        </Link>
      </p>
    </section>
  );
}

export default AdminLogin;
