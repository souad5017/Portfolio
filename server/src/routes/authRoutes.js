import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { loginLimiter } from '../middlewares/rateLimiters.js';

const router = Router();
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;