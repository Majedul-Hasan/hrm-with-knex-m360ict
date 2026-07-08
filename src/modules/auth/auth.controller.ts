// src/modules/auth/auth.controller.ts

import { Request, Response } from 'express';
import status from 'http-status';

import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';

import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  login = catchAsync(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Login successful.',
      data: result,
    });
  });

  forgotPassword = catchAsync(async (req: Request, res: Response) => {
    await this.authService.forgotPassword(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'A password reset email with otp has been sent.',
    });
  });

  resetPassword = catchAsync(async (req: Request, res: Response) => {
    await this.authService.resetPassword(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Password reset successfully.',
    });
  });

  changePassword = catchAsync(async (req: Request, res: Response) => {
    await this.authService.changePassword(req.user!.id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Password changed successfully.',
    });
  });

  me = catchAsync(async (req: Request, res: Response) => {
    const result = await this.authService.me(req.user!.id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Profile fetched successfully.',
      data: result,
    });
  });
}
