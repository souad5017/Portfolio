import Experience from '../models/Experience.js';
import crud from './crudController.js';

export default crud(Experience, { sort: { startDate: -1 } });