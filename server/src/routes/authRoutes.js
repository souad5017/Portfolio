import { Router } from 'express';
import { changePassword, login, logout, me } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { loginLimiter, passwordLimiter } from '../middlewares/rateLimiters.js';

const router = Router();
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, me);
router.put('/password', protect, passwordLimiter, changePassword);

export default router;