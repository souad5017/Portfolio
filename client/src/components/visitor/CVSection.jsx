import Button from '../common/Button.jsx';
import { profile } from '../../data/profile.js';

export default function CVSection() {
  return (
    <section className="section shell" id="cv">
      <div className="cv-wrap">
        <div className="cv-preview">
          <div className="cv-page">
            <div className="cv-head">
              <span>{profile.firstName[0]}{profile.lastName[0]}</span>
              <div>
                <strong>{profile.firstName} {profile.lastName}</strong>
                <small>{profile.role}</small>
              </div>
            </div>
            <div className="cv-lines"><i /><i /><i /><i /></div>
            <div className="cv-columns">
              <div><b>PROFILE</b><i /><i /><b>SKILLS</b><i /><i /><i /></div>
              <div><b>EXPERIENCE</b><i /><i /><i /><b>EDUCATION</b><i /><i /></div>
            </div>
          </div>
          <span className="pdf-badge">PDF · 2 pages</span>
        </div>
        <div className="cv-copy">
          <span className="eyebrow">07 / Curriculum vitae</span>
          <h2>The complete story, in one place.</h2>
          <p>
            A concise overview of my experience, education, technical skills, and the path that shaped how I approach building digital products.
          </p>
          <Button href={profile.cvUrl} icon="download">Download PDF</Button>
          <small>Souad-El-Barjiji-CV.pdf · Updated January 2026</small>
        </div>
      </div>
    </section>
  );
}