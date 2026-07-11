import express, { NextFunction, Request, Response } from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
app.use(morgan('dev'));

import path from 'path';

import cors from 'cors';
import stream from '@infra/logging/stream';
import globalErrorHandler from '@infra/http/express/middlewares/globalErrorHandler';
import status from 'http-status';
import router from '@infra/http/express/routes';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.set('trust proxy', 1);
app.use(morgan('combined', { stream }));
//middleware
app.use(express.json());
// corse
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => res.status(200).send('development'));
} else {
  app.get('/', (req, res) => res.status(200).send('production'));
}

app.get('/health', (_req, res) => {
  let uptime = process.uptime();

  res.status(200).json({
    status: 'ok',
    uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds`,
    timestamp: Date.now(),
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
