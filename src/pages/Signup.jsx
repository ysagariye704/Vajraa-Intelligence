import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (!name || !email || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed.');
        return;
      }

      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setStatus('Account created successfully. Redirecting to login...');
      window.alert('Account created successfully. Please login now.');
      navigate('/login', { state: { message: 'Your account has been created. Please log in.' } });
    } catch (error) {
      setError('Unable to connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Sign Up</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Create your account.</h1>
      <p className="mt-3 text-slate-400">Register with our backend and start using Vajraa Intelligence instantly.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+911234567890"
            className="w-full px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            className="w-full px-4 py-3"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {status && <p className="text-sm text-emerald-300">{status}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-300 hover:text-brand-200">
          Login
        </Link>
      </p>
    </section>
  );
}

export default Signup;
