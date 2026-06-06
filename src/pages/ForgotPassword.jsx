import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Forgot Password</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Recover access to your account.</h1>
      <p className="mt-3 text-slate-400">Enter your email and we will send a reset link when backend is ready.</p>

      <form className="mt-10 space-y-6">
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
        <button type="button" className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
          Send reset link
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Remembered your password?{' '}
        <Link to="/login" className="text-brand-300 hover:text-brand-200">
          Login
        </Link>
      </p>
    </section>
  );
}

export default ForgotPassword;
