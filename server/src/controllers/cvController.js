import path from 'node:path';
import { access } from 'node:fs/promises';
import Profile from '../models/Profile.js';
import { uploadsPath } from '../middlewares/uploadMiddleware.js';
import { cvFileName, getCvPdf } from '../services/pdfService.js';

const disposition = (req, name) => `${req.query.inline ? 'inline' : 'attachment'}; filename="${name}"`;

export const downloadCv = async (req, res) => {
  res.removeHeader('X-Frame-Options');
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  if (profile.cvUrl) {
    const file = path.join(uploadsPath, path.basename(profile.cvUrl));
    const exists = await access(file).then(() => true, () => false);
    if (exists) {
      res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': disposition(req, cvFileName(profile)) });
      return res.sendFile(file);
    }
  }

  const generated = await getCvPdf();
  if (!generated) return res.status(404).json({ message: 'Profile not found' });
  res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': disposition(req, generated.fileName) });
  res.send(generated.pdf);
};