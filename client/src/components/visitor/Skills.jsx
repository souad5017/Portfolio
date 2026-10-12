import SectionHead from '../common/SectionHead.jsx';
import Tag from '../common/Tag.jsx';
import Icon from '../common/Icon.jsx';

const skillGroups = [
  { number: '01', title: 'Frontend', note: 'Interfaces with purpose', skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'] },
  { number: '02', title: 'Backend', note: 'Reliable foundations', skills: ['Node.js', 'Express.js', 'EJS', 'REST API'] },
  { number: '03', title: 'Database', note: 'Structured intelligence', skills: ['MySQL', 'SQL'] },
  { number: '04', title: 'Tools', note: 'A deliberate workflow', skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jira'] },
];

export default function Skills() {
  return (
    <section className="section section-tint" id="skills">
      <div className="shell">
        <SectionHead
          eyebrow="02 / Capabilities"
          title="A focused toolkit for ambitious ideas."
          text="A growing collection of technologies I use to turn considered concepts into fast, accessible, and maintainable digital products."
        />
        <div className="skills-grid">
          {skillGroups.map(({ number, title, note, skills }) => (
            <article className="skill-card" key={title}>
              <div className="skill-top"><span>{number}</span><Icon name="code" /></div>
              <h3>{title}</h3>
              <p>{note}</p>
              <div className="skill-list">
                {skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}