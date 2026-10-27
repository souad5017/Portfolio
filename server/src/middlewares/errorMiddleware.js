export const notFound = (req, res) => res.status(404).json({ message: 'Route not found' });

export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' });
    if (err.name === 'MulterError') return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};