import ManagementPage from '../../components/admin/ManagementPage.jsx';
import { certificateService } from '../../services/certificateService.js';
import { formatDate } from '../../utils/format.js';

const config = {
  title: 'Certifications',
  description: 'Showcase verified credentials and achievements.',
  singular: 'certification',
  icon: 'award',
  service: certificateService,
  primary: { header: 'Certification', key: 'name' },
  columns: [
    { header: 'Organization', render: (item) => item.issuer },
    { header: 'Date', render: (item) => formatDate(item.date) },
    {
      header: 'Credential',
      render: (item) =>
        item.url ? <a className="text-link" href={item.url} target="_blank" rel="noreferrer">View</a> : '—',
    },
  ],
  fields: [
    { name: 'name', label: 'Certification name', required: true },
    { name: 'issuer', label: 'Organization', required: true },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'url', label: 'Credential link (https://...)' },
  ],
};

export default function Certificates() {
  return <ManagementPage config={config} />;
}