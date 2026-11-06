import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';

export const uploadsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../uploads');

const createUpload = (field, extensions, maxMb) =>
  multer({
    storage: multer.diskStorage({
      destination: uploadsPath,
      filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}${extensions[file.mimetype]}`),
    }),
    limits: { fileSize: maxMb * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, Object.hasOwn(extensions, file.mimetype)),
  }).single(field);

export const uploadImage = createUpload(
  'image',
  { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' },
  5
);
export const uploadPdf = createUpload('cv', { 'application/pdf': '.pdf' }, 10);