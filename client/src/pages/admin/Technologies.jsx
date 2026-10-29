import ManagementPage from '../../components/admin/ManagementPage.jsx';
import { categories } from '../../data/categories.js';
import { technologyService } from '../../services/technologyService.js';

const config = {
  title: 'Technologies',
  description: 'Manage the technologies available for your projects and skills.',
  singular: 'technology',
  icon: 'code',
  service: technologyService,
  primary: { header: 'Technology', key: 'name' },
  columns: [{ header: 'Category', render: (item) => item.category }],
  fields: [
    { name: 'name', label: 'Technology name', required: true },
    { name: 'category', label: 'Category', type: 'select', options: categories, defaultValue: 'Frontend' },
  ],
};

export default function Technologies() {
  return <ManagementPage config={config} />;
}