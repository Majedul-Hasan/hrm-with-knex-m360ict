import { NextFunction, Request, Response } from 'express';

export const requirePermissions =
  (...permissions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    // Admin bypass
    console.log(11, req.user.role.name, req.user.role.name === 'admin');
    if (req.user.role.name === 'admin') {
      return next();
    }
    console.log(req.user?.role.permissions);
    const hasPermission = permissions.every(permission => req.user?.role.permissions.includes(permission));

    if (!hasPermission) {
      return res.sendStatus(403);
    }

    next();
  };
