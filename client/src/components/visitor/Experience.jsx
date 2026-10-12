import SectionHead from '../common/SectionHead.jsx';

const timeline = [
  {
    date: '2025 — Present',
    title: 'Full Stack Web Developer',
    place: 'Independent · Morocco',
    text: 'Designing and delivering responsive web applications from interface architecture to database integration.',
    items: ['Build reusable React interfaces', 'Develop RESTful APIs and relational schemas', 'Translate product goals into polished experiences'],
  },
  {
    date: '2024 — 2025',
    title: 'Web Development Intern',
    place: 'Digital Studio · Casablanca',
    text: 'Collaborated with a multidisciplinary team to build, test, and improve production-ready web experiences.',
    items: ['Implemented responsive UI features', 'Integrated APIs and tested endpoints', 'Participated in agile delivery cycles'],
  },
];

export default function Experience() {
  return (
    <section className="section section-tint" id="experience">
      <div className="shell">
        <SectionHead eyebrow="04 / Experience" title="Where craft met real-world challenges." />
        <div className="timeline">
          {timeline.map((item, i) => (
            <article className="timeline-item" key={item.title}>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-node">
                <i />
                {i < timeline.length - 1 && <span />}
              </div>
              <div className="timeline-content">
                <span>{item.place}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.items.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}