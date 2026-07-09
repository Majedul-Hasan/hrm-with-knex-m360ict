import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';

import { RoleController } from './role.controller';

export const createDepartmentRoutes = (controller: RoleController) => {
  const router = Router();
  router.get(
    '/',
    authMiddleware(),
    //   validateRequest(new JoiValidator(listHrUsersSchema)),
    controller.list
  );
  return router;
};
