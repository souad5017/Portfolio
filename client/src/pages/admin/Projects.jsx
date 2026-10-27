import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Card from '../../components/admin/Card.jsx';
import ConfirmDelete from '../../components/admin/ConfirmDelete.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import ProjectTable from '../../components/admin/ProjectTable.jsx';
import useFetch from '../../hooks/useFetch.js';
import { deleteProject, getAllProjects } from '../../services/projectService.js';

export default function Projects() {
  const { data: projects, error, reload } = useFetch(getAllProjects);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = (projects ?? []).filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) &&
      (status === 'all' || (status === 'published') === project.published)
  );

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProject(toDelete._id);
      setToDelete(null);
      reload();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage the projects displayed on your portfolio."
        action={
          <Link className="btn btn-primary" to="/admin/projects/new">
            <AdminIcon name="plus" size={16} /> Add project
          </Link>
        }
      />
      <Card className="table-card management-card">
        <div className="filters">
          <div className="search-field">
            <AdminIcon name="search" />
            <input placeholder="Search projects..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <span>{filtered.length} projects</span>
        </div>
        {error && <p className="empty">Unable to load projects.</p>}
        {!error && !projects && <p className="empty">Loading…</p>}
        {projects && (filtered.length
          ? <ProjectTable projects={filtered} onDelete={setToDelete} />
          : <p className="empty">No projects found.</p>)}
      </Card>
      {toDelete && (
        <ConfirmDelete
          title="Delete project?"
          itemName={toDelete.title}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </>
  );
}