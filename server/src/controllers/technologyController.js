import Technology from '../models/Technology.js';
import crud from './crudController.js';

export default crud(Technology, { sort: { category: 1, name: 1 } });