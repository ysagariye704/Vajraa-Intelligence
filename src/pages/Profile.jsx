import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', country: '', state: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    if (!saved) {
      navigate('/login');
      return;
    }

    const authUser = JSON.parse(saved);
    setUserId(authUser.user_id);

    fetch(`/api/profile/?user_id=${authUser.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error || 'Failed to load profile');
        }

        setProfile(data.profile);
        setForm({
          name: data.profile.name || authUser.name || '',
          country: data.profile.country || '',
          state: data.profile.state || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load profile data.');
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const updateAuthUser = (updates) => {
    const saved = JSON.parse(localStorage.getItem('authUser') || '{}');
    const next = { ...saved, ...updates };
    localStorage.setItem('authUser', JSON.stringify(next));
    window.dispatchEvent(new Event('authChange'));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setMessage('');
    setError('');
  };

  const handleUploadImage = async () => {
    if (!imageFile || !userId) {
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    const data = new FormData();
    data.append('user_id', userId);
    data.append('profile_image', imageFile);

    try {
      const response = await fetch('/api/profile/upload-image/', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      const updatedProfile = { ...profile, profile_image_url: result.profile_image_url };
      setProfile(updatedProfile);
      updateAuthUser({ profile_image_url: result.profile_image_url });
      setMessage('Profile image uploaded successfully.');
      setPreview('');
      setImageFile(null);
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/profile/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          name: form.name,
          country: form.country,
          state: form.state,
        }),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Save failed');
      }

      setProfile(result.profile);
      updateAuthUser({ name: result.profile.name });
      setEditing(false);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-950/80 p-10 text-center text-slate-200 shadow-glow">
        Loading your profile...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-glow sm:p-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Profile</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Manage your account</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Update your name, location, and profile image. Your profile will remain private and visible only in your dashboard.</p>
        </div>

        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Edit Profile
        </button>
      </div>

      {error && <div className="mb-6 rounded-3xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">{error}</div>}
      {message && <div className="mb-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">{message}</div>}

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-4xl font-semibold text-slate-100 ring-1 ring-slate-700">
              {preview ? (
                <img alt="Preview" src={preview} className="h-full w-full object-cover" />
              ) : profile?.profile_image_url ? (
                <img alt="Profile" src={profile.profile_image_url} className="h-full w-full object-cover" />
              ) : profile?.name ? (
                profile.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                'UI'
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile image</p>
              <label
                htmlFor="profile-image"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-brand-500 hover:text-white"
              >
                Choose image
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {preview && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Preview</p>
              <img src={preview} alt="Selected preview" className="mt-4 w-full rounded-3xl object-cover" />
            </div>
          )}

          <button
            type="button"
            onClick={handleUploadImage}
            disabled={!imageFile || uploading}
            className="w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="grid gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editing}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-500 disabled:cursor-not-allowed disabled:bg-slate-900"
              />
            </div>

            <div>
              <label htmlFor="country" className="text-sm font-medium text-slate-300">
                Country
              </label>
              <input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                disabled={!editing}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-500 disabled:cursor-not-allowed disabled:bg-slate-900"
              />
            </div>

            <div>
              <label htmlFor="state" className="text-sm font-medium text-slate-300">
                State
              </label>
              <input
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!editing}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-500 disabled:cursor-not-allowed disabled:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleSave}
              disabled={!editing || saving}
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              to="/afterlogin"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm text-slate-100 transition hover:border-brand-500"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
