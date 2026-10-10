import { useState } from 'react';
import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { profile } from '../../data/profile.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  const links = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', label: 'LinkedIn', value: profile.linkedin, href: profile.linkedin },
    { icon: 'github', label: 'GitHub', value: profile.github, href: profile.github },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="shell">
        <div className="contact-head">
          <span className="eyebrow">08 / Contact</span>
          <h2>Let&apos;s work<br /><em>together.</em></h2>
          <p>Have a project in mind? Let&apos;s talk.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-details">
            <p>Whether you have an opportunity, a project idea, or simply want to connect — my inbox is open.</p>
            <div className="contact-links">
              {links.map(({ icon, label, value, href }) => (
                <a href={href} key={label}>
                  <span><Icon name={icon} /></span>
                  <div><small>{label}</small><strong>{value}</strong></div>
                  <Icon name="arrow" />
                </a>
              ))}
            </div>
            <div className="contact-location">
              <i />
              <span>Based in Morocco<br /><small>Open to remote opportunities</small></span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label><span>Name</span><input required placeholder="Your name" /></label>
              <label><span>Email</span><input required type="email" placeholder="you@company.com" /></label>
            </div>
            <label><span>Subject</span><input required placeholder="Tell me what this is about" /></label>
            <label><span>Message</span><textarea required rows={5} placeholder="A little about your project or opportunity..." /></label>
            <Button type="submit" icon="arrow">{sent ? 'Message sent — thank you' : 'Send message'}</Button>
          </form>
        </div>
      </div>
    </section>
  );
}