import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminButton from './AdminButton.jsx';
import AdminIcon from './AdminIcon.jsx';
import Card from './Card.jsx';
import Field from './Field.jsx';
import PageHeader from './PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { createProject, updateProject } from '../../services/projectService.js';
import { getTechnologies } from '../../services/technologyService.js';
import { uploadImage } from '../../services/uploadService.js';

const toDateInput = (date) => (date ? date.slice(0, 10) : '');

export default function ProjectForm({ project }) {
  const navigate = useNavigate();
  const { data: technologies } = useFetch(getTechnologies);
  const [selected, setSelected] = useState(project?.technologies.map((tech) => tech._id) ?? []);
  const [image, setImage] = useState(project?.image ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const available = (technologies ?? []).filter((tech) => !selected.includes(tech._id));
  const nameOf = (id) => technologies?.find((tech) => tech._id === id)?.name ?? '…';

  const handleFile = async (event) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      setImage(await uploadImage(file));
    } catch {
      setError('Image upload failed (PNG, JPG or WebP, 5MB max).');
    } finally {
      setUploading(false);
      input.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...form,
      published: form.published === 'true',
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      image,
      technologies: selected,
    };
    setSaving(true);
    setError('');
    try {
      await (project ? updateProject(project._id, payload) : createProject(payload));
      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Unable to save the project.');
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title={project ? 'Edit Project' : 'Add New Project'}
        description="Create a polished case study for your portfolio."
      />
      <form className="project-form-layout" onSubmit={handleSubmit}>
        <div className="form-stack">
          <Card>
            <h2>Basic information</h2>
            <div className="form-grid">
              <Field label="Project title" name="title" required defaultValue={project?.title} placeholder="e.g. Nexus Commerce" />
              <Field label="Project type" name="type" defaultValue={project?.type} placeholder="e.g. Full-stack platform" />
            </div>
            <Field as="textarea" label="Short description" name="description" rows={3} required defaultValue={project?.description} placeholder="One-line project summary" />
            <Field as="textarea" label="Full description" name="details" rows={7} defaultValue={project?.details} placeholder="Describe the challenge, your process and the outcome..." />
          </Card>

          <Card>
            <h2>Project image</h2>
            <div className="upload-zone">
              {image ? (
                <img className="upload-preview" src={image} alt="Project preview" />
              ) : (
                <div className="upload-icon"><AdminIcon name="upload" /></div>
              )}
              <strong>{image ? 'Image uploaded' : 'No image yet'}</strong>
              <p>PNG, JPG or WebP up to 5MB</p>
              <label className="btn btn-secondary">
                {uploading ? 'Uploading...' : image ? 'Replace image' : 'Upload image'}
                <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleFile} />
              </label>
            </div>
          </Card>

          <Card>
            <h2>Technologies</h2>
            <div className="selected-tags">
              {selected.map((id) => (
                <span key={id}>
                  {nameOf(id)}
                  <button type="button" aria-label="Remove" onClick={() => setSelected(selected.filter((item) => item !== id))}>
                    <AdminIcon name="close" size={12} />
                  </button>
                </span>
              ))}
            </div>
            <Field
              as="select"
              label="Add technology"
              value=""
              onChange={(event) => event.target.value && setSelected([...selected, event.target.value])}
            >
              <option value="">Select a technology</option>
              {available.map((tech) => <option key={tech._id} value={tech._id}>{tech.name}</option>)}
            </Field>
          </Card>
        </div>

        <aside className="form-stack">
          <Card>
            <h2>Project information</h2>
            <Field as="select" label="Status" name="published" defaultValue={String(project?.published ?? true)}>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </Field>
            <Field label="Start date" name="startDate" type="date" defaultValue={toDateInput(project?.startDate)} />
            <Field label="End date" name="endDate" type="date" defaultValue={toDateInput(project?.endDate)} />
          </Card>
          <Card>
            <h2>Project links</h2>
            <Field label="GitHub URL" name="github" defaultValue={project?.github} placeholder="https://github.com/..." />
            <Field label="Live demo URL" name="demo" defaultValue={project?.demo} placeholder="https://..." />
          </Card>
          {error && <p className="form-error">{error}</p>}
          <Card className="form-actions">
            <Link className="btn btn-secondary" to="/admin/projects">Cancel</Link>
            <AdminButton type="submit" disabled={saving || uploading}>
              {saving ? 'Saving...' : 'Save project'}
            </AdminButton>
          </Card>
        </aside>
      </form>
    </>
  );
}