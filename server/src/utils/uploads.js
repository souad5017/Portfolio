import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { uploadsPath } from '../middlewares/uploadMiddleware.js';

const UPLOAD_NAME = /^[0-9a-f-]{36}\.(png|jpg|webp|pdf)$/;

export const removeUpload = async (url) => {
  if (typeof url !== 'string' || !url) return;

  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return;
  }
  if (!pathname.startsWith('/uploads/')) return;

  const name = path.basename(pathname);
  if (!UPLOAD_NAME.test(name)) return;
  await unlink(path.join(uploadsPath, name)).catch(() => {});
};