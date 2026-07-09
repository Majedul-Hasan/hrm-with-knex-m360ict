import { Request, Response } from 'express';

import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';

import pickValidFields from '@shared/validator/pickValidFields';
import { EmploymentStatusService } from './employmentStatus.service';

export class EmploymentStatusController {
  constructor(private readonly service: EmploymentStatusService) {}
  list = catchAsync(async (req: Request, res: Response) => {
    const options = pickValidFields(req.query, ['limit', 'page', 'search']);

    const result = await this.service.list(options as any);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Role list fetched successfully.',
      data: result,
    });
  });
}
