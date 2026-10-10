import SectionHead from '../common/SectionHead.jsx';

const stats = [
  { number: '01', value: '3+', label: 'Years learning & building' },
  { number: '02', value: '12+', label: 'Projects brought to life', featured: true },
  { number: '03', value: '∞', label: "Curiosity for what's next" },
];

const journey = [
  'Computer Science Foundations',
  'Frontend Development',
  'Full Stack Engineering',
  'Building meaningful products',
];

export default function About() {
  return (
    <section className="section shell" id="about">
      <SectionHead eyebrow="01 / About" title="Curious by nature. Precise by practice." />
      <div className="about-layout">
        <div className="about-lead">
          <p>
            I&apos;m a full-stack developer focused on crafting digital products that feel <em>clear, capable, and human.</em>
          </p>
          <p className="muted">
            From the first wireframe to the final API endpoint, I enjoy connecting design thinking with strong technical foundations. My goal is simple: create useful products people genuinely enjoy using.
          </p>
          <div className="location"><span>34.0209° N</span><i /><strong>Morocco</strong></div>
        </div>

        <div className="stats-grid">
          {stats.map(({ number, value, label, featured }) => (
            <div className={`stat-card ${featured ? 'featured' : ''}`} key={number}>
              <span>{number}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
          <div className="about-note">
            <span>Current focus</span>
            <p>Scalable React architectures &amp; thoughtful product design.</p>
          </div>
        </div>
      </div>

      <div className="journey-strip">
        <span className="journey-title">The journey so far</span>
        {journey.map((item, i) => (
          <div className="journey-item" key={item}>
            <span>0{i + 1}</span>
            <i />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}