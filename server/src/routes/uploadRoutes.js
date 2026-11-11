import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadImage, uploadPdf } from '../middlewares/uploadMiddleware.js';
import { uploadFile } from '../utils/uploads.js';

const router = Router();

const store = (message) => async (req, res) => {
  if (!req.file) return res.status(400).json({ message });
  res.status(201).json({ url: await uploadFile(req.file.buffer) });
};

router.post('/', protect, uploadImage, store('A PNG, JPG or WebP image is required'));
router.post('/cv', protect, uploadPdf, store('A PDF file is required'));

export default router;