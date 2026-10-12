import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import Tag from '../../components/common/Tag.jsx';
import { projects } from '../../data/projects.js';

const features = [
  'Responsive component system',
  'Secure authentication workflow',
  'Real-time data interactions',
  'Accessible, mobile-first interface',
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => String(p.id) === id);
  const goHome = () => navigate('/');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!project) {
    return (
      <div className="detail-page">
        <div className="detail-nav shell">
          <button onClick={goHome}><Icon name="back" /> Back to projects</button>
        </div>
        <div className="shell detail-hero"><h1>Not found</h1></div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-nav shell">
        <button onClick={goHome}><Icon name="back" /> Back to projects</button>
        <span>{project.num} / {String(projects.length).padStart(2, '0')}</span>
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
          <span>Year</span><strong>2026</strong>
          <span>Stack</span>
          <div className="tag-row">
            {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </aside>
        <main>
          <span className="eyebrow">The project</span>
          <h2>Turning complexity into a clear, confident experience.</h2>
          <p>
            The project began with a simple challenge: create a product that makes a complicated workflow feel natural. I mapped the core user journey, built a scalable visual language, and developed each flow with speed and accessibility in mind.
          </p>
          <h3>Key features</h3>
          <div className="feature-list">
            {features.map((f, i) => (
              <div key={f}><span>0{i + 1}</span><p>{f}</p></div>
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