import { useState } from 'react';
import Icon from '../common/Icon.jsx';
import { profile } from '../../data/profile.js';

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Certificates', 'CV', 'Contact'];

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="navbar">
        <a href="#home" className="brand">
          <span className="brand-mark">{profile.firstName[0]}</span>
          <span>{profile.firstName} <b>{profile.lastName}</b></span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="icon-link desktop-social" href={profile.github} aria-label="GitHub"><Icon name="github" /></a>
          <a className="icon-link desktop-social" href={profile.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className={dark ? '' : 'active'}><Icon name="sun" size={15} /></span>
            <span className={dark ? 'active' : ''}><Icon name="moon" size={15} /></span>
          </button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  );
}