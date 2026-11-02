import AdminIcon from './AdminIcon.jsx';

export default function Header({ identity, openMenu }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" onClick={openMenu} aria-label="Open menu">
        <AdminIcon name="menu" />
      </button>
      <div className="top-actions">
        <div className="admin-avatar">{identity.initials}</div>
        <div className="admin-meta">
          <strong>{identity.name}</strong>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}