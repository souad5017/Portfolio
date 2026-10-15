import { useNavigate } from 'react-router-dom';
import SectionHead from '../common/SectionHead.jsx';
import ProjectCard from './ProjectCard.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProjects } from '../../services/projectService.js';

export default function Projects() {
  const navigate = useNavigate();
  const { data: projects, loading, error } = useFetch(getProjects);

  return (
    <section className="section shell" id="projects">
      <SectionHead
        eyebrow="03 / Selected work"
        title="Ideas, designed and engineered."
        text="A selection of work exploring product thinking, interface craft, and full-stack development."
      />
      {loading && <p className="muted">Loading projects…</p>}
      {error && <p className="muted">Unable to load projects.</p>}
      <div className="projects-list">
        {projects?.map((project, index) => (
          <ProjectCard
            key={project._id}
            project={project}
            index={index}
            onOpen={() => navigate(`/projects/${project._id}`)}
          />
        ))}
      </div>
    </section>
  );
}