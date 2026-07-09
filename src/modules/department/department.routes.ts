import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';

import { DepartmentController } from './department.controller';

export const createDepartmentRoutes = (controller: DepartmentController) => {
  const router = Router();
  router.get(
    '/',
    authMiddleware(),
    //   validateRequest(new JoiValidator(listHrUsersSchema)),
    controller.list
  );
  return router;
};
