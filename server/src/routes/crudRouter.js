import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const crudRouter = (controller, { publicRead = true, publicCreate = false } = {}) => {
  const router = Router();
  const read = publicRead ? [] : [protect];
  const create = publicCreate ? [] : [protect];

  router.route('/').get(...read, controller.list).post(...create, controller.create);
  router.route('/:id').get(...read, controller.getOne).put(protect, controller.update).delete(protect, controller.remove);

  return router;
};

export default crudRouter;