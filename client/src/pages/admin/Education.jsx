import ManagementPage from '../../components/admin/ManagementPage.jsx';
import { educationService } from '../../services/educationService.js';
import { formatPeriod } from '../../utils/formatPeriod.js';

const config = {
  title: 'Education',
  description: 'Manage your education and professional training.',
  singular: 'education',
  icon: 'book',
  service: educationService,
  primary: { header: 'Program', key: 'degree' },
  columns: [
    { header: 'Institution', render: (item) => item.school },
    { header: 'Period', render: (item) => formatPeriod(item.startDate, item.endDate) },
  ],
  fields: [
    { name: 'degree', label: 'Program or degree', required: true },
    { name: 'school', label: 'Institution', required: true },
    { name: 'startDate', label: 'Start date', type: 'date', required: true },
    { name: 'endDate', label: 'End date (leave empty if ongoing)', type: 'date' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
};

export default function Education() {
  return <ManagementPage config={config} />;
}