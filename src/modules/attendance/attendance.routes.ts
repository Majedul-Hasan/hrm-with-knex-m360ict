// src/modules/attendance/attendance.routes.ts

import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { JoiValidator } from '@shared/validator/joi.validator';

import { AttendanceController } from './attendance.controller';
import { attendanceFilterSchema, createAttendanceSchema, updateAttendanceSchema } from './attendance.validation';

export const createAttendanceRoutes = (controller: AttendanceController) => {
  const router = Router();

  router.get('/', authMiddleware(), validateRequest(new JoiValidator(attendanceFilterSchema)), controller.list);

  router.get('/:id', authMiddleware(), controller.getById);

  router.post('/', authMiddleware(), validateRequest(new JoiValidator(createAttendanceSchema)), controller.create);

  router.put('/:id', authMiddleware(), validateRequest(new JoiValidator(updateAttendanceSchema)), controller.update);

  router.delete('/:id', authMiddleware(), controller.delete);

  return router;
};
