import { Router } from 'express';
import projectRoutes from './projectRoutes.js';
import technologyRoutes from './technologyRoutes.js';
import skillRoutes from './skillRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import educationRoutes from './educationRoutes.js';
import certificateRoutes from './certificateRoutes.js';
import messageRoutes from './messageRoutes.js';
import profileRoutes from './profileRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/projects', projectRoutes);
router.use('/technologies', technologyRoutes);
router.use('/skills', skillRoutes);
router.use('/experiences', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/certificates', certificateRoutes);
router.use('/messages', messageRoutes);
router.use('/profile', profileRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;