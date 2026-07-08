import { Request, Response, NextFunction } from 'express';
import { extractBearerToken } from '@shared/security/extractBearerToken';
import { ForbiddenError } from '@shared/errors';
import { authenticationService } from '@infra/providers/auth.provider';

export const authMiddleware = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractBearerToken(req.headers.authorization);

      // decode  token and get the payload (username, role etc

      let user = await authenticationService.authenticate(token);
      console.log(user);

      if (roles.length && !roles.includes(user.roleName)) {
        throw new ForbiddenError();
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
