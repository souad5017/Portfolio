import Certificate from '../models/Certificate.js';
import crud from './crudController.js';

export default crud(Certificate, { sort: { date: -1 } });