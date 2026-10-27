import Project from '../models/Project.js';
import crud from './crudController.js';

export default crud(Project, {
  populate: 'technologies',
  sort: { startDate: -1 },
  filter: (req) => {
    if (!req.userId) return { published: true };
    return req.query.published === 'true' ? { published: true } : {};
  },
});