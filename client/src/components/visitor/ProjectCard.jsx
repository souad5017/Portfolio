import Icon from '../common/Icon.jsx';
import Tag from '../common/Tag.jsx';

export default function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={`project-card project-${index + 1}`}>
      <div className="project-image">
        <img src={project.image} alt={`${project.title} project workspace`} />
        <span className="image-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-copy">
        <span className="project-type">{project.type}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.technologies.map((tech) => <Tag key={tech._id}>{tech.name}</Tag>)}
        </div>
        <div className="project-actions">
          <button onClick={onOpen}>View case study <Icon name="arrow" /></button>
          <a href={project.github} aria-label={`${project.title} GitHub`}><Icon name="github" /></a>
          <a href={project.demo} aria-label={`${project.title} live demo`}><Icon name="external" /></a>
        </div>
      </div>
    </article>
  );
}