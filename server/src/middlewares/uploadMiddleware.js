import multer from 'multer';

const createUpload = (field, allowed, maxMb) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxMb * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, allowed.includes(file.mimetype)),
  }).single(field);

export const uploadImage = createUpload('image', ['image/png', 'image/jpeg', 'image/webp'], 5);
export const uploadPdf = createUpload('cv', ['application/pdf'], 10);