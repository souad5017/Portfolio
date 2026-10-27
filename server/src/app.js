import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { uploadsPath } from './middlewares/uploadMiddleware.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
app.use('/uploads', express.static(uploadsPath));

export default app;