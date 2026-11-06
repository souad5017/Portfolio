import { Router } from 'express';
import { downloadCv } from '../controllers/cvController.js';
import { cvLimiter } from '../middlewares/rateLimiters.js';

const router = Router();
router.get('/', cvLimiter, downloadCv);

export default router;