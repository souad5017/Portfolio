import { Link } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Card from '../../components/admin/Card.jsx';
import MessageList from '../../components/admin/MessageList.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import ProjectTable from '../../components/admin/ProjectTable.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getStats } from '../../services/dashboardService.js';
import { getAllProjects } from '../../services/projectService.js';
import { getMessages } from '../../services/messageService.js';

const cards = [
  { key: 'projects', label: 'Projects', icon: 'folder', tone: 'purple', to: '/admin/projects' },
  { key: 'skills', label: 'Skills', icon: 'spark', tone: 'pink', to: '/admin/skills' },
  { key: 'experiences', label: 'Experiences', icon: 'briefcase', tone: 'cyan', to: '/admin/experiences' },
  { key: 'education', label: 'Education', icon: 'book', tone: 'amber', to: '/admin/education' },
  { key: 'certificates', label: 'Certifications', icon: 'award', tone: 'purple', to: '/admin/certificates' },
  { key: 'messages', label: 'Messages', icon: 'mail', tone: 'cyan', to: '/admin/messages' },
];

export default function Dashboard() {
  const { data: stats } = useFetch(getStats);
  const { data: projects } = useFetch(getAllProjects);
  const { data: messages } = useFetch(getMessages);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage and monitor your portfolio content."
        action={
          <a className="btn btn-secondary" href="/" target="_blank" rel="noreferrer">
            <AdminIcon name="eye" size={16} /> View portfolio
          </a>
        }
      />

      <div className="stat-grid">
        {cards.map(({ key, label, icon, tone, to }) => (
          <Link className="card stat-card" to={to} key={key}>
            <div className={`stat-icon tone-${tone}`}><AdminIcon name={icon} /></div>
            <div className="stat-copy">
              <span>{label}</span>
              <strong>{stats ? stats[key] : '—'}</strong>
              {key === 'messages' && stats && <small>{stats.unreadMessages} unread</small>}
            </div>
            <AdminIcon name="arrow" size={16} />
          </Link>
        ))}
      </div>

      <div className="dashboard-grid lower">
        <Card className="table-card">
          <div className="section-head">
            <div>
              <h2>Recent projects</h2>
              <p>Latest additions to your portfolio</p>
            </div>
            <Link className="text-link" to="/admin/projects">
              View all <AdminIcon name="arrow" size={14} />
            </Link>
          </div>
          {projects && (projects.length
            ? <ProjectTable projects={projects.slice(0, 3)} />
            : <p className="empty">No projects yet.</p>)}
        </Card>

        <Card className="messages-card">
          <div className="section-head">
            <div>
              <h2>Recent messages</h2>
              <p>Latest visitor enquiries</p>
            </div>
            <Link className="text-link" to="/admin/messages">
              View all <AdminIcon name="arrow" size={14} />
            </Link>
          </div>
          {messages && (messages.length
            ? <MessageList messages={messages.slice(0, 3)} />
            : <p className="empty">No messages yet.</p>)}
        </Card>
      </div>
    </>
  );
}