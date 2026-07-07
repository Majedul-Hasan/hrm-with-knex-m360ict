import { Request, Response, NextFunction } from 'express';

import { extractBearerToken } from '@shared/security/extractBearerToken';
import { ForbiddenError } from '@shared/errors';

export const authMiddleware = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractBearerToken(req.headers.authorization);

      // decode  token and get the payload (username, role etc

      let user: any;
      // = await authService.authenticate(token); // TODO
      console.log(user);

      if (roles.length && !roles.includes(user.role)) {
        throw new ForbiddenError();
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
