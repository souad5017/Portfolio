import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadImage } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.post('/', protect, uploadImage, (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'A PNG, JPG or WebP image is required' });
  res.status(201).json({ url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` });
});

export default router;