import { NextFunction, Request, Response } from 'express';

export const requirePermissions =
  (...permissions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    // Admin bypass

    if (req.user.roleName === 'admin') {
      return next();
    }

    // const hasPermission = permissions.every(permission => req.user?.role.permissions.includes(permission));

    next();
  };
