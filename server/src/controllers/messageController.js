import Message from '../models/Message.js';
import crud from './crudController.js';

const controller = crud(Message, { sort: { createdAt: -1 } });

export default {
  ...controller,
  create: async (req, res) => {
    const { name, email, subject, message } = req.body;
    res.status(201).json(await Message.create({ name, email, subject, message }));
  },
};