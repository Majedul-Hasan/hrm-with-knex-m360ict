import AppError from '@shared/errors/base/AppError';
import { NextFunction, Request, Response } from 'express';

export const parseBodyData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.body.bodyData) {
    try {
      req.body = JSON.parse(req.body.bodyData);
    } catch (error) {
      return next(new AppError(400, 'Invalid JSON format in bodyData'));
    }
  }
  next();
};
