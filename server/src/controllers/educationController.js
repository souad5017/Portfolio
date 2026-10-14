import Education from '../models/Education.js';
import crud from './crudController.js';

export default crud(Education, { sort: { startDate: -1 } });