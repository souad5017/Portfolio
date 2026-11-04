import { getCvPdf } from '../services/pdfService.js';

export const downloadCv = async (req, res) => {
  const result = await getCvPdf();
  if (!result) return res.status(404).json({ message: 'Profile not found' });

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${req.query.inline ? 'inline' : 'attachment'}; filename="${result.fileName}"`,
  });
  res.send(result.pdf);
};