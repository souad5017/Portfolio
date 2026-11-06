import { useState } from 'react';
import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { sendMessage } from '../../services/messageService.js';

const display = (url = '') => url.replace(/^https?:\/\//, '');

const errorMessage = (err) => {
  if (err.response?.status === 429) return 'Too many messages. Please try again later.';
  if (err.response?.status === 400) return 'Please check your details and try again.';
  return 'Something went wrong. Please try again.';
};

export default function Contact({ profile }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    setStatus('sending');
    setError('');
    try {
      await sendMessage(Object.fromEntries(new FormData(form)));
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(errorMessage(err));
      setStatus('error');
    }
  };

  const clearFeedback = () => {
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const links = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', label: 'LinkedIn', value: display(profile.linkedin), href: profile.linkedin },
    { icon: 'github', label: 'GitHub', value: display(profile.github), href: profile.github },
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
              <span>Based in {profile.location}<br /><small>Open to remote opportunities</small></span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} onChange={clearFeedback}>
            <div className="form-row">
              <label><span>Name</span><input name="name" required maxLength={100} placeholder="Your name" /></label>
              <label><span>Email</span><input name="email" required type="email" maxLength={254} placeholder="you@company.com" /></label>
            </div>
            <label><span>Subject</span><input name="subject" required maxLength={150} placeholder="Tell me what this is about" /></label>
            <label><span>Message</span><textarea name="message" required maxLength={5000} rows={5} placeholder="A little about your project or opportunity..." /></label>
            <Button type="submit" icon="arrow">{status === 'sending' ? 'Sending…' : 'Send message'}</Button>
            {status === 'sent' && (
              <p className="form-feedback success" role="status">Thank you! Your message has been sent.</p>
            )}
            {status === 'error' && <p className="form-feedback error" role="alert">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}