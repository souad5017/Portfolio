import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminButton from '../../components/admin/AdminButton.jsx';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Card from '../../components/admin/Card.jsx';
import Field from '../../components/admin/Field.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProfile, updateProfile } from '../../services/profileService.js';
import { uploadImage } from '../../services/uploadService.js';
import { initials } from '../../utils/format.js';

export default function Profile() {
  const { refreshProfile } = useOutletContext();
  const { data, loading } = useFetch(getProfile);
  const [photoDraft, setPhotoDraft] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  if (loading) return null;
  const profile = data ?? {};
  const photo = photoDraft ?? profile.photo ?? '';

  const handleFile = async (event) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      setPhotoDraft(await uploadImage(file));
    } catch {
      setError('Photo upload failed (PNG, JPG or WebP, 5MB max).');
    } finally {
      setUploading(false);
      input.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      await updateProfile({ ...Object.fromEntries(new FormData(event.currentTarget)), photo });
      refreshProfile();
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Unable to save your profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="My Profile" description="Manage your personal and professional information." />

      {saved && (
        <div className="toast success">
          <AdminIcon name="check" />
          <div>
            <strong>Profile updated</strong>
            <span>Your changes are now live.</span>
          </div>
          <button onClick={() => setSaved(false)} aria-label="Close"><AdminIcon name="close" size={16} /></button>
        </div>
      )}

      <form className="form-stack" onSubmit={handleSubmit}>
        <Card>
          <div className="section-head">
            <div>
              <h2>Personal information</h2>
              <p>Your core details and public identity</p>
            </div>
          </div>

          <div className="photo-editor">
            <div
              className="photo"
              style={photo ? { backgroundImage: `url("${photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
              {!photo && initials(`${profile.firstName ?? ''} ${profile.lastName ?? ''}`)}
            </div>
            <div>
              <strong>Profile photo</strong>
              <p>PNG, JPG or WebP up to 5MB</p>
              <div className="inline-actions">
                <label className="btn btn-secondary">
                  {uploading ? 'Uploading...' : photo ? 'Replace photo' : 'Upload photo'}
                  <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleFile} />
                </label>
                {photo && (
                  <AdminButton variant="ghost" onClick={() => setPhotoDraft('')}>Remove</AdminButton>
                )}
              </div>
            </div>
          </div>

          <div className="form-grid">
            <Field label="First name" name="firstName" required defaultValue={profile.firstName} />
            <Field label="Last name" name="lastName" required defaultValue={profile.lastName} />
            <Field label="Professional title" name="role" defaultValue={profile.role} />
            <Field label="Email" name="email" type="email" defaultValue={profile.email} />
            <Field label="Phone" name="phone" defaultValue={profile.phone} />
            <Field label="Location" name="location" defaultValue={profile.location} />
          </div>
        </Card>

        <Card>
          <div className="section-head">
            <div>
              <h2>Professional information</h2>
              <p>Shape the story visitors see</p>
            </div>
          </div>
          <Field as="textarea" label="Short introduction" name="intro" rows={3} defaultValue={profile.intro} />
          <Field as="textarea" label="About me" name="about" rows={6} defaultValue={profile.about} />
          <div className="form-grid">
            <Field as="textarea" label="Professional summary" name="summary" rows={4} defaultValue={profile.summary} />
            <Field as="textarea" label="Career goals" name="goals" rows={4} defaultValue={profile.goals} />
          </div>
        </Card>

        <Card>
          <div className="section-head">
            <div>
              <h2>Social links</h2>
              <p>Connect your professional profiles</p>
            </div>
          </div>
          <div className="form-grid">
            <Field label="GitHub" name="github" defaultValue={profile.github} placeholder="https://github.com/..." />
            <Field label="LinkedIn" name="linkedin" defaultValue={profile.linkedin} placeholder="https://linkedin.com/in/..." />
            <Field label="Website" name="website" defaultValue={profile.website} placeholder="https://..." />
          </div>
        </Card>

        {error && <p className="form-error">{error}</p>}
        <div className="save-bar">
          <AdminButton type="submit" icon="check" disabled={saving || uploading}>
            {saving ? 'Saving...' : 'Save changes'}
          </AdminButton>
        </div>
      </form>
    </>
  );
}