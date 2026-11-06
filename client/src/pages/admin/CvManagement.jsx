import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminButton from '../../components/admin/AdminButton.jsx';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Badge from '../../components/admin/Badge.jsx';
import Card from '../../components/admin/Card.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProfile, updateProfile } from '../../services/profileService.js';
import { getStats } from '../../services/dashboardService.js';
import { cvUrl } from '../../services/cvService.js';
import { uploadCv } from '../../services/uploadService.js';

const countRow = (label, count, to) => ({
  label,
  to,
  hint: 'Included in your generated CV',
  ready: count > 0,
  status: count > 0 ? `${count} added` : 'Empty',
});

export default function CvManagement() {
  const { data: profile, reload: reloadProfile } = useFetch(getProfile);
  const { data: stats } = useFetch(getStats);
  const [version, setVersion] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const previewUrl = `${cvUrl}?inline=1`;

  const saveCvUrl = async (url) => {
    await updateProfile({ cvUrl: url });
    reloadProfile();
    setVersion((v) => v + 1);
  };

  const handleFile = async (event) => {
    const input = event.target;
    const file = input.files[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      await saveCvUrl(await uploadCv(file));
    } catch {
      setError('CV upload failed (PDF only, 10MB max).');
    } finally {
      setBusy(false);
      input.value = '';
    }
  };

  const removeCv = async () => {
    setBusy(true);
    setError('');
    try {
      await saveCvUrl('');
    } catch {
      setError('Unable to remove the CV.');
    } finally {
      setBusy(false);
    }
  };

  const sources = profile && stats
    ? [
        {
          label: 'Contact details',
          to: '/admin/profile',
          hint: 'Email, phone, location and links',
          ready: Boolean(profile.email),
          status: profile.email ? 'Ready' : 'Missing',
        },
        {
          label: 'Professional summary',
          to: '/admin/profile',
          hint: 'Summary, or the about text as a fallback',
          ready: Boolean(profile.summary || profile.about),
          status: profile.summary || profile.about ? 'Ready' : 'Missing',
        },
        countRow('Skills', stats.skills, '/admin/skills'),
        countRow('Experiences', stats.experiences, '/admin/experiences'),
        countRow('Education', stats.education, '/admin/education'),
        countRow('Certifications', stats.certificates, '/admin/certificates'),
      ]
    : [];

  return (
    <>
      <PageHeader
        title="CV Management"
        description="Upload your own CV, or let the portfolio generate one for you."
        action={
          <a className="btn btn-primary" href={cvUrl}>
            <AdminIcon name="download" size={16} /> Download PDF
          </a>
        }
      />

      <div className="cv-layout">
        <div className="form-stack">
          <Card>
            <h2>Your CV file</h2>
            <div className="setting-row">
              <div>
                <strong>{profile?.cvUrl ? 'Custom PDF uploaded' : 'Auto-generated CV'}</strong>
                <p>
                  {profile?.cvUrl
                    ? 'Visitors download your uploaded file.'
                    : 'Upload a PDF to replace the generated CV. It will be public.'}
                </p>
              </div>
              {profile && (
                <Badge tone={profile.cvUrl ? 'green' : 'muted'}>{profile.cvUrl ? 'Custom' : 'Generated'}</Badge>
              )}
            </div>
            <div className="inline-actions">
              <label className="btn btn-secondary">
                {busy ? 'Working...' : profile?.cvUrl ? 'Replace PDF' : 'Upload PDF'}
                <input type="file" accept="application/pdf" hidden disabled={busy} onChange={handleFile} />
              </label>
              {profile?.cvUrl && (
                <AdminButton variant="ghost" onClick={removeCv} disabled={busy}>Use generated CV</AdminButton>
              )}
            </div>
            {error && <p className="form-error">{error}</p>}
          </Card>

          <Card>
            <h2>Generated CV content</h2>
            {!sources.length && <p className="empty">Loading…</p>}
            {sources.map(({ label, hint, ready, status, to }) => (
              <div className="setting-row" key={label}>
                <div>
                  <strong>{label}</strong>
                  <p>{hint}</p>
                </div>
                <div className="inline-actions">
                  <Badge tone={ready ? 'green' : 'muted'}>{status}</Badge>
                  <Link className="text-link" to={to}>
                    Edit <AdminIcon name="arrow" size={14} />
                  </Link>
                </div>
              </div>
            ))}
            <p className="muted">
              Used only when no custom PDF is uploaded. Changes can take up to 30 seconds to appear.
            </p>
          </Card>
        </div>

        <Card className="cv-preview">
          <div className="section-head">
            <div>
              <h2>Live preview</h2>
              <p>Exactly what visitors download</p>
            </div>
            <AdminButton variant="ghost" onClick={() => setVersion((v) => v + 1)}>Refresh</AdminButton>
          </div>
          <iframe key={version} className="cv-frame" src={previewUrl} title="CV preview" />
          <a className="btn btn-secondary" href={previewUrl} target="_blank" rel="noreferrer">
            <AdminIcon name="eye" size={16} /> Open in new tab
          </a>
        </Card>
      </div>
    </>
  );
}