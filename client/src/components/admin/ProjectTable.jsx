import Badge from './Badge.jsx';
import { formatDate, initials } from '../../utils/format.js';

export default function ProjectTable({ projects }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr><th>Project</th><th>Technologies</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <div className="project-cell">
                  <span>{initials(project.title)}</span>
                  <div>
                    <strong>{project.title}</strong>
                    <small>{project.type}</small>
                  </div>
                </div>
              </td>
              <td>
                <div className="tag-row">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span className="tech-tag" key={tech._id}>{tech.name}</span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="tech-tag">+{project.technologies.length - 2}</span>
                  )}
                </div>
              </td>
              <td>
                <Badge tone={project.published ? 'green' : 'muted'}>
                  {project.published ? 'Published' : 'Draft'}
                </Badge>
              </td>
              <td className="date-cell">{formatDate(project.endDate ?? project.startDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}