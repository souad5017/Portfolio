import crudRouter from './crudRouter.js';
import messageController from '../controllers/messageController.js';
import { contactLimiter } from '../middlewares/rateLimiters.js';

export default crudRouter(messageController, {
  publicRead: false,
  publicCreate: true,
  createLimiter: contactLimiter,
});