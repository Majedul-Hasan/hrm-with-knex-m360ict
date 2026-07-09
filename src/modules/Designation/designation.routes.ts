import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';

import { DesignationController } from './designation.controller';

export const createDesignationRoutes = (controller: DesignationController) => {
  const router = Router();
  router.get(
    '/',
    authMiddleware(),
    //   validateRequest(new JoiValidator(listHrUsersSchema)),
    controller.list
  );
  return router;
};
