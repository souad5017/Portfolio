import rateLimit from 'express-rate-limit';

const limiter = (windowMinutes, limit, message, options = {}) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message },
    ...options,
  });

export const loginLimiter = limiter(15, 10, 'Too many login attempts, please try again later', {
  skipSuccessfulRequests: true,
});
export const contactLimiter = limiter(60, 10, 'Too many messages, please try again later');
export const cvLimiter = limiter(10, 30, 'Too many downloads, please try again later');
export const passwordLimiter = limiter(15, 5, 'Too many attempts, please try again later', {
  skipSuccessfulRequests: true,
});