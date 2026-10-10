import SectionHead from '../common/SectionHead.jsx';
import Icon from '../common/Icon.jsx';

export default function Education() {
  return (
    <section className="section shell" id="education">
      <SectionHead eyebrow="05 / Education" title="Built on strong foundations." />
      <div className="education-grid">
        <article className="education-feature">
          <div className="education-year">2023 — 2025</div>
          <span className="education-icon"><Icon name="education" size={25} /></span>
          <div>
            <span>Specialized Technician Diploma</span>
            <h3>Digital Development — Full Stack</h3>
            <p>OFPPT · Morocco</p>
            <p className="muted">
              Intensive training in web engineering, data modeling, agile methods, and end-to-end application development.
            </p>
          </div>
        </article>
        <article className="education-small">
          <span>2022 — 2023</span>
          <h3>Computer Science Foundations</h3>
          <p>Core programming, algorithms, and systems concepts.</p>
        </article>
        <blockquote>“Learning is not a phase. It&apos;s the way forward.”</blockquote>
      </div>
    </section>
  );
}