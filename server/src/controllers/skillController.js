import Skill from '../models/Skill.js';
import crud from './crudController.js';

export default crud(Skill, { sort: { category: 1, order: 1 } });