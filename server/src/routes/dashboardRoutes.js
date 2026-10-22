import { Router } from 'express';
import { getStats } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', protect, getStats);

export default router;