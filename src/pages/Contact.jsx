import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (!name || !email || !message) {
      setError('Please complete all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Could not submit your request.');
        return;
      }

      setStatus(data.message || 'Your request has been sent successfully.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setError('Unable to connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Start a conversation with our team.</h1>
        <p className="mt-4 text-slate-300">Fill in your details and we will get back to you with a product walkthrough and implementation plan.</p>

        <div className="mt-10 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Founder</p>
            <p className="mt-2 text-lg font-semibold text-white">Yash Sagariye</p>
            <p className="mt-2 text-slate-300">Ivajraa@gmail.com</p>
            <p className="mt-1 text-slate-300">+91 99244 61429</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Sales</p>
            <p className="mt-2 text-lg text-white">sales@varaa.ai</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <p className="text-sm text-slate-400">Support</p>
            <p className="mt-2 text-lg text-white">support@varaa.ai</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 shadow-glow">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
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
            <label className="mb-2 block text-sm font-semibold text-slate-200">Message</label>
            <textarea
              rows="5"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us about your goals"
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
            {isLoading ? 'Submitting...' : 'Submit request'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
