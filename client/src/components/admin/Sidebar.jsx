import { NavLink } from 'react-router-dom';
import AdminIcon from './AdminIcon.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const sections = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', icon: 'grid', to: '/admin', end: true },
      { name: 'Profile', icon: 'user', to: '/admin/profile' },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Projects', icon: 'folder', to: '/admin/projects' },
      { name: 'Technologies', icon: 'code', to: '/admin/technologies' },
      { name: 'Skills', icon: 'spark', to: '/admin/skills' },
      { name: 'Experiences', icon: 'briefcase', to: '/admin/experiences' },
      { name: 'Education', icon: 'book', to: '/admin/education' },
      { name: 'Certifications', icon: 'award', to: '/admin/certificates' },
    ],
  },
  { label: 'Communication', items: [{ name: 'Messages', icon: 'mail', to: '/admin/messages' }] },
  { label: 'CV', items: [{ name: 'CV Management', icon: 'file', to: '/admin/cv' }] },
  { label: 'System', items: [{ name: 'Settings', icon: 'settings', to: '/admin/settings' }] },
];

export default function Sidebar({ identity, unread, open, close }) {
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">{identity.initials}<span>.</span></div>
        <div>
          <strong>{identity.name}</strong>
          <small>Portfolio Admin</small>
        </div>
        <button className="icon-btn mobile-close" onClick={close} aria-label="Close menu">
          <AdminIcon name="close" />
        </button>
      </div>
      <nav>
        {sections.map((section) => (
          <div className="nav-section" key={section.label}>
            <span className="nav-label">{section.label}</span>
            {section.items.map(({ name, icon, to, end }) => (
              <NavLink key={to} to={to} end={end} className="nav-item" onClick={close}>
                <AdminIcon name={icon} />
                <span>{name}</span>
                {name === 'Messages' && unread > 0 && <b>{unread}</b>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <button className="nav-item logout" onClick={logout}>
        <AdminIcon name="logout" />
        <span>Logout</span>
      </button>
    </aside>
  );
}