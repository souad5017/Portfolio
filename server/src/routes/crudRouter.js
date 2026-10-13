import { Router } from 'express';

const crudRouter = (controller) => {
  const router = Router();
  router.route('/').get(controller.list).post(controller.create);
  router.route('/:id').get(controller.getOne).put(controller.update).delete(controller.remove);
  return router;
};

export default crudRouter;