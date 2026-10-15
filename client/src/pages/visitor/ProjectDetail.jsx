import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Tag from '../../components/common/Tag.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProject } from '../../services/projectService.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, loading, error } = useFetch(getProject, id);
  const goHome = () => navigate('/');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading || error || !project) {
    return (
      <div className="detail-page">
        <div className="detail-nav shell">
          <button onClick={goHome}><Icon name="back" /> Back to projects</button>
        </div>
        <div className="shell detail-hero">
          {loading ? <p className="muted">Loading…</p> : <h1>Not found</h1>}
        </div>
      </div>
    );
  }

  const date = project.endDate ?? project.startDate;

  return (
    <div className="detail-page">
      <div className="detail-nav shell">
        <button onClick={goHome}><Icon name="back" /> Back to projects</button>
      </div>

      <div className="shell detail-hero">
        <span className="eyebrow">{project.type}</span>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="hero-buttons">
          <Button href={project.github} variant="secondary" icon="github">View source</Button>
          <Button href={project.demo} icon="external">Live demo</Button>
        </div>
      </div>

      <div className="detail-image shell">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="detail-body shell">
        <aside>
          <span>Role</span><strong>Design &amp; Development</strong>
          <span>Year</span><strong>{date ? new Date(date).getFullYear() : '—'}</strong>
          <span>Stack</span>
          <div className="tag-row">
            {project.technologies.map((tech) => <Tag key={tech._id}>{tech.name}</Tag>)}
          </div>
        </aside>
        <main>
          <span className="eyebrow">The project</span>
          <h2>Turning complexity into a clear, confident experience.</h2>
          <p>{project.details}</p>
          <h3>Key features</h3>
          <div className="feature-list">
            {(project.features ?? []).map((feature, i) => (
              <div key={feature}><span>0{i + 1}</span><p>{feature}</p></div>
            ))}
          </div>
        </main>
      </div>

      <div className="detail-next shell">
        <span>Next case study</span>
        <button onClick={goHome}>Explore more work <Icon name="arrow" /></button>
      </div>
    </div>
  );
}