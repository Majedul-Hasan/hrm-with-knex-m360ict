// src/modules/attendance/attendance.routes.ts

import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { JoiValidator } from '@shared/validator/joi.validator';

import { AttendanceController } from './attendance.controller';
import { attendanceFilterSchema, createAttendanceSchema, updateAttendanceSchema } from './attendance.validation';

export const createAttendanceRoutes = (controller: AttendanceController) => {
  const router = Router();

  router.get(
    '/',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'),
    validateRequest(new JoiValidator(attendanceFilterSchema)),
    controller.list
  );

  router.get('/:id', authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'), controller.getById);

  router.post(
    '/',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'),
    validateRequest(new JoiValidator(createAttendanceSchema)),
    controller.create
  );

  router.put(
    '/:id',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'),
    validateRequest(new JoiValidator(updateAttendanceSchema)),
    controller.update
  );

  router.delete('/:id', authMiddleware('SUPER_ADMIN', 'HR_ADMIN', 'MANAGER'), controller.delete);

  return router;
};
