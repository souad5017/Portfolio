import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <section className="section shell">
      <h2>Dashboard</h2>
      <p className="muted">Signed in as {user.email}</p>
      <Button variant="secondary" onClick={logout}>Log out</Button>
    </section>
  );
}