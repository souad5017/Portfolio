import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminButton from '../../components/admin/AdminButton.jsx';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Card from '../../components/admin/Card.jsx';
import Field from '../../components/admin/Field.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProfile } from '../../services/profileService.js';
import { emptyProfile } from '../../data/profile.js';
import { getIdentity } from '../../utils/identity.js';

const loginError = (err) => {
  if (!err.response) return 'Unable to reach the server.';
  if (err.response.status === 429) return 'Too many attempts. Please try again later.';
  return 'Invalid email or password.';
};

export default function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const { data } = useFetch(getProfile);
  const identity = getIdentity(data ?? emptyProfile);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(loginError(err));
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-orb orb-one" />
      <div className="login-orb orb-two" />
      <div className="login-brand">
        <div className="brand-mark large">{identity.initials}<span>.</span></div>
        <span>{identity.name}</span>
      </div>
      <Card className="login-card">
        <div className="login-icon"><AdminIcon name="lock" /></div>
        <p className="eyebrow">Portfolio administration</p>
        <h1>Welcome back</h1>
        <p>Manage your portfolio from one place.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <Field label="Email address" name="email" type="email" required autoComplete="username" />
          <Field label="Password" name="password" type="password" required autoComplete="current-password" error={error} />
          <AdminButton type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
            {!submitting && <AdminIcon name="arrow" size={16} />}
          </AdminButton>
        </form>
        <div className="secure-note"><AdminIcon name="lock" size={14} /> Secured admin access</div>
      </Card>
      <p className="login-footer">© {new Date().getFullYear()} {identity.name}. Portfolio CMS.</p>
    </main>
  );
}