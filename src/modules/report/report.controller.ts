import { Request, Response } from 'express';

import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';

import pickValidFields from '@shared/validator/pickValidFields';
import { ReportService } from './report.service';

export class ReportController {
  constructor(private readonly service: ReportService) {}
  attendanceReport = catchAsync(async (req: Request, res: Response) => {
    const options: any = pickValidFields(req.query, ['limit', 'page', 'employeeId', 'month', 'search']);
    const data = await this.service.attendanceReport(options);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Attendance report fetched successfully.',
      data,
    });
  });
}
