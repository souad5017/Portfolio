import ManagementPage from '../../components/admin/ManagementPage.jsx';
import { categories } from '../../data/categories.js';
import { skillService } from '../../services/skillService.js';

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const config = {
  title: 'Skills',
  description: 'Organize the skills and expertise shown on your portfolio.',
  singular: 'skill',
  icon: 'spark',
  service: skillService,
  primary: { header: 'Skill', key: 'name' },
  columns: [
    { header: 'Category', render: (item) => item.category },
    {
      header: 'Level',
      render: (item) => (
        <div className={`skill-level skill-${item.level.toLowerCase()}`}>
          <span />
          <small>{item.level}</small>
        </div>
      ),
    },
    { header: 'Order', render: (item) => item.order },
  ],
  fields: [
    { name: 'name', label: 'Skill name', required: true },
    { name: 'category', label: 'Category', type: 'select', options: categories, defaultValue: 'Frontend' },
    { name: 'level', label: 'Level', type: 'select', options: levels, defaultValue: 'Intermediate' },
    { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
  ],
};

export default function Skills() {
  return <ManagementPage config={config} />;
}