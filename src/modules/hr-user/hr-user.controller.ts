import { Request, Response } from 'express';

import { HrUserService } from './hr-user.service';
import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';
import { HR_USER_MESSAGES } from './hr-user.constants';
import pickValidFields from '@shared/validator/pickValidFields';

export class HrUserController {
  constructor(private readonly service: HrUserService) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const origin = `${protocol}://${host}`;
    const file: Express.Multer.File | undefined = req.file;
    const payload = req.body;
    const result = await this.service.create(
      {
        ...payload,
        file,
      },
      origin
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: HR_USER_MESSAGES.CREATED,
      data: result,
    });
  });

  list = catchAsync(async (req: Request, res: Response) => {
    const options = pickValidFields(req.query, ['limit', 'page', 'search']);

    const result = await this.service.list(options as any);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.LIST_RETRIEVED,
      data: result,
    });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.getById(req.params.id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.RETRIEVED,
      data: result,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const origin = `${protocol}://${host}`;
    const file: Express.Multer.File | undefined = req.file;
    const payload = req.body;

    const result = await this.service.update(
      req.params.id as string,
      {
        ...payload,
        file,
      },
      origin
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.UPDATED,
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await this.service.delete(req.params.id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.DELETED,
      data: null,
    });
  });

  changeStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.changeStatus(req.params.id as string, req.body.status);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.STATUS_UPDATED,
      data: result,
    });
  });

  assignRole = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.assignRole(req.params.id as string, req.body.roleId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: HR_USER_MESSAGES.ROLE_ASSIGNED,
      data: result,
    });
  });

  me = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.me(req.user!.id as unknown as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: HR_USER_MESSAGES.PROFILE_RETRIEVED,
      data: result,
    });
  });
}
