import Message from '../models/Message.js';
import crud from './crudController.js';

export default crud(Message, { sort: { createdAt: -1 } });