import { Request, Response, NextFunction } from 'express';

import { extractBearerToken } from '@shared/security/extractBearerToken';
import { ForbiddenError, UserNotFoundError } from '@shared/errors';
import { verifyAccessToken } from '@shared/security/interfaces/jwt.provider';
import config from '@shared/config/env.const';
import { Secret } from 'jsonwebtoken';
import { UserModel } from '@infra/persistence/mongoose/models/user.model';

export const authMiddleware = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractBearerToken(req.headers.authorization);

      const decoded: any = verifyAccessToken(token, config.jwt.jwt_secret as Secret);

      const user = await UserModel.findById(decoded.id).populate('role');
      if (!user) throw new UserNotFoundError();

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
