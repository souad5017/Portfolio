import Profile from '../models/Profile.js';
import { cvFileName, getCvPdf } from '../services/pdfService.js';

const disposition = (req, name) => `${req.query.inline ? 'inline' : 'attachment'}; filename="${name}"`;

const fetchUploadedCv = async (url) => {
  try {
    if (new URL(url).hostname !== 'res.cloudinary.com') return null;
    const response = await fetch(url);
    return response.ok ? Buffer.from(await response.arrayBuffer()) : null;
  } catch {
    return null;
  }
};

export const downloadCv = async (req, res) => {
  res.removeHeader('X-Frame-Options');

  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  const uploaded = profile.cvUrl ? await fetchUploadedCv(profile.cvUrl) : null;
  if (uploaded) {
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': disposition(req, cvFileName(profile)) });
    return res.send(uploaded);
  }

  const generated = await getCvPdf();
  if (!generated) return res.status(404).json({ message: 'Profile not found' });
  res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': disposition(req, generated.fileName) });
  res.send(generated.pdf);
};