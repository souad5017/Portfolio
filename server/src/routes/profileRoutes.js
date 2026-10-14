import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = Router();
router.route('/').get(getProfile).put(updateProfile);

export default router;