import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadImage, uploadPdf } from '../middlewares/uploadMiddleware.js';

const router = Router();

const respondWithUrl = (message) => (req, res) => {
  if (!req.file) return res.status(400).json({ message });
  res.status(201).json({ url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` });
};

router.post('/', protect, uploadImage, respondWithUrl('A PNG, JPG or WebP image is required'));
router.post('/cv', protect, uploadPdf, respondWithUrl('A PDF file is required'));

export default router;