import SectionHead from '../common/SectionHead.jsx';
import Tag from '../common/Tag.jsx';
import Icon from '../common/Icon.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getSkills } from '../../services/skillService.js';

const categories = [
  { title: 'Frontend', note: 'Interfaces with purpose' },
  { title: 'Backend', note: 'Reliable foundations' },
  { title: 'Database', note: 'Structured intelligence' },
  { title: 'Tools', note: 'A deliberate workflow' },
];

export default function Skills() {
  const { data: skills } = useFetch(getSkills);

  return (
    <section className="section section-tint" id="skills">
      <div className="shell">
        <SectionHead
          eyebrow="02 / Capabilities"
          title="A focused toolkit for ambitious ideas."
          text="A growing collection of technologies I use to turn considered concepts into fast, accessible, and maintainable digital products."
        />
        <div className="skills-grid">
          {categories.map(({ title, note }, i) => (
            <article className="skill-card" key={title}>
              <div className="skill-top"><span>0{i + 1}</span><Icon name="code" /></div>
              <h3>{title}</h3>
              <p>{note}</p>
              <div className="skill-list">
                {skills?.filter((skill) => skill.category === title).map((skill) => (
                  <Tag key={skill._id}>{skill.name}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}