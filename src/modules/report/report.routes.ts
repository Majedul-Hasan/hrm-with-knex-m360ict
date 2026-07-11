import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';

import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { JoiValidator } from '@shared/validator/joi.validator';
import { attendanceReportSchema } from './report.validation';
import { ReportController } from './report.controller';

export const createReportRoutes = (controller: ReportController) => {
  const router = Router();
  router.get(
    '/attendance',

    authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'),

    validateRequest(new JoiValidator(attendanceReportSchema)),

    controller.attendanceReport
  );
  return router;
};
