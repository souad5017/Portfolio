import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
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
    } catch {
      setError('Invalid email or password.');
      setSubmitting(false);
    }
  };

  return (
    <section className="section shell">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Admin login</h2>
        <label><span>Email</span><input name="email" type="email" required autoComplete="username" /></label>
        <label><span>Password</span><input name="password" type="password" required autoComplete="current-password" /></label>
        <Button type="submit" icon="arrow">{submitting ? 'Signing in…' : 'Sign in'}</Button>
        {error && <p className="muted">{error}</p>}
      </form>
    </section>
  );
}