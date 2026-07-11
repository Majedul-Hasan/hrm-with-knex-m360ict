import { Router } from 'express';

import { HrUserController } from './hr-user.controller';

import {
  updateHrUserSchema,
  deleteHrUserSchema,
  listHrUsersSchema,
  changeUserStatusSchema,
  assignRoleSchema,
  CreateEmployeeDto,
} from './hr-user.validation';
import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { JoiValidator } from '@shared/validator/joi.validator';
import { fileUploader } from '@infra/http/express/middlewares/uploadImage.middleware';
import { parseBodyData } from '@infra/http/express/middlewares/parseBodyData';

export const createHrUserRoutes = (controller: HrUserController) => {
  const router = Router();

  router.post(
    '/',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),
    fileUploader.profileImage,
    parseBodyData,
    validateRequest(new JoiValidator(CreateEmployeeDto)),
    controller.create
  );

  router.get(
    '/',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),
    validateRequest(new JoiValidator(listHrUsersSchema)),
    controller.list
  );

  router.get('/me', authMiddleware('SUPER_ADMIN', 'HR_ADMIN'), controller.me);

  router.get(
    '/:id',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),

    //  validateRequest(new JoiValidator(getHrUserSchema)),
    controller.getById
  );

  router.patch(
    '/:id',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),

    fileUploader.profileImage,
    parseBodyData,
    validateRequest(new JoiValidator(updateHrUserSchema)),
    controller.update
  );

  router.delete(
    '/:id',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),
    validateRequest(new JoiValidator(deleteHrUserSchema)),
    controller.delete
  );

  router.patch(
    '/:id/status',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),

    validateRequest(new JoiValidator(changeUserStatusSchema)),
    controller.changeStatus
  );

  router.patch(
    '/:id/role',
    authMiddleware('SUPER_ADMIN', 'HR_ADMIN'),

    validateRequest(new JoiValidator(assignRoleSchema)),
    controller.assignRole
  );

  return router;
};
