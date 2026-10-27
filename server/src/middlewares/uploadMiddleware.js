import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';

export const uploadsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../uploads');

const extensions = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' };

export const uploadImage = multer({
  storage: multer.diskStorage({
    destination: uploadsPath,
    filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}${extensions[file.mimetype]}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype in extensions),
}).single('image');