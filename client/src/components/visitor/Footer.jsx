import { Link } from 'react-router-dom';
import Icon from '../common/Icon.jsx';
import { profile } from '../../data/profile.js';

export default function Footer() {
  return (
    <footer>
      <div className="shell footer-inner">
        <a href="#home" className="brand">
          <span className="brand-mark">{profile.firstName[0]}</span>
          <span>{profile.firstName} <b>{profile.lastName}</b><small>{profile.role}</small></span>
        </a>
        <div className="footer-nav">
          <a href="#about">About</a>
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <Link to="/admin/login">Admin</Link>
        </div>
        <div className="footer-meta">
          <div>
            <a href={profile.github} aria-label="GitHub"><Icon name="github" /></a>
            <a href={profile.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
          </div>
          <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        </div>
      </div>
    </footer>
  );
}