import { useNavigate } from 'react-router-dom';
import SectionHead from '../common/SectionHead.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../../data/projects.js';

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section className="section shell" id="projects">
      <SectionHead
        eyebrow="03 / Selected work"
        title="Ideas, designed and engineered."
        text="A selection of work exploring product thinking, interface craft, and full-stack development."
      />
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => navigate(`/projects/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
}