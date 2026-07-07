import express, { NextFunction, Request, Response } from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
app.use(morgan('dev'));

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
