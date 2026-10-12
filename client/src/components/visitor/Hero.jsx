import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import { profile } from '../../data/profile.js';

export default function Hero() {
  return (
    <section className="hero shell" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="availability"><i /> Available for opportunities <span>2026</span></div>
          <p className="hero-kicker">Hello, I&apos;m</p>
          <h1>{profile.firstName}<br /><span>{profile.lastName}.</span></h1>
          <div className="role-row"><span>{profile.role}</span><i /></div>
          <p className="hero-description">
            I build modern, responsive and user-focused web applications — where thoughtful design meets reliable engineering.
          </p>
          <div className="hero-buttons">
            <Button href="#projects" icon="arrow">View my projects</Button>
            <Button href={profile.cvUrl} variant="secondary" icon="download">Download CV</Button>
          </div>
          <div className="hero-socials">
            <span>Find me on</span><i />
            <a href={profile.github}><Icon name="github" /> GitHub</a>
            <a href={profile.linkedin}><Icon name="linkedin" /> LinkedIn</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="code-chip chip-a"><span>01</span><code>{'const craft = "intentional";'}</code></div>
          <div className="portrait-frame">
            <div className="portrait-noise" />
            <div className="portrait-monogram">{profile.firstName[0]}</div>
            <div className="portrait-caption">
              <div><small>Based in</small><strong>Morocco</strong></div>
              <span>MA</span>
            </div>
          </div>
          <div className="code-chip chip-b"><Icon name="code" /><code>design → build → refine</code></div>
          <span className="visual-index">S / 01</span>
        </div>
      </div>
      <a href="#about" className="scroll-cue"><span>Scroll to explore</span><i /></a>
    </section>
  );
}