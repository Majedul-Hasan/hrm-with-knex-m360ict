import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';

import { EmploymentStatusController } from './employmentStatus.controller';

export const createEmploymentStatusRoutes = (controller: EmploymentStatusController) => {
  const router = Router();
  router.get(
    '/',
    authMiddleware(),
    //   validateRequest(new JoiValidator(listHrUsersSchema)),
    controller.list
  );
  return router;
};
