import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminButton from '../../components/admin/AdminButton.jsx';
import AdminIcon from '../../components/admin/AdminIcon.jsx';
import Badge from '../../components/admin/Badge.jsx';
import Card from '../../components/admin/Card.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getProfile } from '../../services/profileService.js';
import { getStats } from '../../services/dashboardService.js';
import { cvUrl } from '../../services/cvService.js';

const countRow = (label, count, to) => ({
  label,
  to,
  hint: 'Included in your CV',
  ready: count > 0,
  status: count > 0 ? `${count} added` : 'Empty',
});

export default function CvManagement() {
  const { data: profile } = useFetch(getProfile);
  const { data: stats } = useFetch(getStats);
  const [version, setVersion] = useState(0);
  const previewUrl = `${cvUrl}?inline=1`;

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
        description="Your CV is generated automatically from your portfolio content."
        action={
          <a className="btn btn-primary" href={cvUrl}>
            <AdminIcon name="download" size={16} /> Download PDF
          </a>
        }
      />

      <div className="cv-layout">
        <div className="form-stack">
          <Card>
            <h2>CV content</h2>
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
          </Card>
          <Card>
            <h2>How it works</h2>
            <p className="muted">
              Edit your profile, skills, experiences, education and certifications, and the CV follows.
              Changes can take up to 30 seconds to appear in the preview.
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