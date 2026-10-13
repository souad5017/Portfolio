import { Router } from 'express';
import projectRoutes from './projectRoutes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/projects', projectRoutes);

export default router;