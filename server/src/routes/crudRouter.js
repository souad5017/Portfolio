import { Router } from 'express';
import { protect, attachUser } from '../middlewares/authMiddleware.js';

const crudRouter = (controller, { publicRead = true, publicCreate = false, createLimiter } = {}) => {
  const router = Router();
  const read = publicRead ? [attachUser] : [protect];
  const create = [...(createLimiter ? [createLimiter] : []), ...(publicCreate ? [] : [protect])];

  router.route('/').get(...read, controller.list).post(...create, controller.create);
  router.route('/:id').get(...read, controller.getOne).put(protect, controller.update).delete(protect, controller.remove);

  return router;
};

export default crudRouter;