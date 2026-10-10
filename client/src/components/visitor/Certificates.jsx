import SectionHead from '../common/SectionHead.jsx';
import Icon from '../common/Icon.jsx';

const certificates = [
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2025', text: 'Modern responsive layouts, accessibility, and interface fundamentals.' },
  { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2025', text: 'Data structures, algorithmic thinking, and modern JavaScript.' },
  { name: 'React Development', issuer: 'Meta', year: '2026', text: 'Component architecture, state, testing, and production patterns.' },
];

export default function Certificates() {
  return (
    <section className="section section-tint" id="certificates">
      <div className="shell">
        <SectionHead eyebrow="06 / Certificates" title="Always learning. Always refining." />
        <div className="cert-grid">
          {certificates.map(({ name, issuer, year, text }, index) => (
            <article className="cert-card" key={name}>
              <div className="cert-top"><span>0{index + 1}</span><Icon name="certificate" size={25} /></div>
              <small>{issuer} · {year}</small>
              <h3>{name}</h3>
              <p>{text}</p>
              <button>View certificate <Icon name="external" /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}