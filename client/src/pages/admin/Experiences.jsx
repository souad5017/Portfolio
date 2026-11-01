import ManagementPage from '../../components/admin/ManagementPage.jsx';
import { experienceService } from '../../services/experienceService.js';
import { formatPeriod } from '../../utils/formatPeriod.js';

const config = {
  title: 'Experiences',
  description: 'Keep your professional journey accurate and up to date.',
  singular: 'experience',
  icon: 'briefcase',
  service: experienceService,
  primary: { header: 'Position', key: 'position' },
  columns: [
    { header: 'Company', render: (item) => item.company },
    { header: 'Period', render: (item) => formatPeriod(item.startDate, item.endDate) },
    { header: 'Location', render: (item) => item.location || '—' },
  ],
  fields: [
    { name: 'position', label: 'Position', required: true },
    { name: 'company', label: 'Company', required: true },
    { name: 'location', label: 'Location' },
    { name: 'startDate', label: 'Start date', type: 'date', required: true },
    { name: 'endDate', label: 'End date (leave empty if current)', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'missions', label: 'Main missions (one per line)', type: 'lines' },
  ],
};

export default function Experiences() {
  return <ManagementPage config={config} />;
}