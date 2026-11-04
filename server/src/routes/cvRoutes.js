import { Router } from 'express';
import { downloadCv } from '../controllers/cvController.js';

const router = Router();
router.get('/', downloadCv);

export default router;