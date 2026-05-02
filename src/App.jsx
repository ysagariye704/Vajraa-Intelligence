import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { API_BASE_URL } from './config/api';
import Navbar from './components/Navbar';
import AlNavbar from './components/AlNavbar';
import AdmNavbar from './components/AdmNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AfterLoginHome from './pages/AfterLoginHome';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Settings from './pages/Settings';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminStats from './pages/AdminStats';
import AdminActivityLog from './pages/AdminActivityLog';
import AdminSettings from './pages/AdminSettings';

function HomeRoute() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('authUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    setUser(saved ? JSON.parse(saved) : null);
  }, []);

  return user ? <AfterLoginHome /> : <Home />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const readAuthUser = () => {
      const saved = localStorage.getItem('authUser');
      setUser(saved ? JSON.parse(saved) : null);
    };

    readAuthUser();
    window.addEventListener('authChange', readAuthUser);
    return () => window.removeEventListener('authChange', readAuthUser);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => console.log('Backend connected:', data))
      .catch((err) => console.error('Backend error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-slate-950 to-slate-950 text-slate-100">
      {user ? (user.role === 'admin' ? <AdmNavbar /> : <AlNavbar />) : <Navbar />}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/afterlogin" element={<AfterLoginHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/app-admin/dashboard" element={<AdminDashboard />} />
          <Route path="/app-admin/users" element={<AdminUsers />} />
          <Route path="/app-admin/contacts" element={<AdminContacts />} />
          <Route path="/app-admin/statistics" element={<AdminStats />} />
          <Route path="/app-admin/activity-logs" element={<AdminActivityLog />} />
          <Route path="/app-admin/settings" element={<AdminSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
