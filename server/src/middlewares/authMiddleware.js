import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const attachUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
  } catch {
    // jeton invalide ou expiré : la requête est traitée comme celle d'un visiteur
  }
  next();
};