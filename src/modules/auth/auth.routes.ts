import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { changePasswordSchema, forgotPasswordSchema, loginSchema, resetPasswordSchema } from './auth.validation';
import { JoiValidator } from '@shared/validator/joi.validator';

export const createAuthRoutes = (controller: AuthController) => {
  const router = Router();

  router.post('/login', validateRequest(new JoiValidator(loginSchema)), controller.login);
  router.post('/forgot-password', validateRequest(new JoiValidator(forgotPasswordSchema)), controller.forgotPassword);
  router.post('/reset-password', validateRequest(new JoiValidator(resetPasswordSchema)), controller.resetPassword);
  router.post(
    '/change-password',
    authMiddleware(),
    validateRequest(new JoiValidator(changePasswordSchema)),
    controller.changePassword
  );
  router.get('/me', authMiddleware(), controller.me);
  return router;
};
