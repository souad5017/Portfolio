import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.route('/').get(getProfile).put(protect, updateProfile);

export default router;