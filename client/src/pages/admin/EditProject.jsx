import { useParams } from 'react-router-dom';
import PageHeader from '../../components/admin/PageHeader.jsx';
import ProjectForm from '../../components/admin/ProjectForm.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProject } from '../../services/projectService.js';

export default function EditProject() {
  const { id } = useParams();
  const { data: project, error } = useFetch(getProject, id);

  if (error) return <PageHeader title="Project not found" description="This project does not exist or was deleted." />;
  if (!project) return null;
  return <ProjectForm key={project._id} project={project} />;
}