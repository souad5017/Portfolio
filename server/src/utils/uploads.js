import { v2 as cloudinary } from 'cloudinary';

const FOLDER = 'portfolio';
const PUBLIC_ID = new RegExp(`^/[^/]+/image/upload/(?:v\\d+/)?(${FOLDER}/[^./]+)\\.[a-z0-9]+$`, 'i');

export const uploadFile = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: FOLDER, resource_type: 'auto' }, (error, result) =>
        error ? reject(error) : resolve(result.secure_url)
      )
      .end(buffer);
  });

export const removeUpload = async (url) => {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== 'res.cloudinary.com') return;
    const publicId = PUBLIC_ID.exec(pathname)?.[1];
    if (publicId) await cloudinary.uploader.destroy(publicId, { resource_type: 'image', invalidate: true });
  } catch {
    // not a file we manage, or already deleted
  }
};