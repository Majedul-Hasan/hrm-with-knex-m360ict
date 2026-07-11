import { Request, Response } from 'express';
import status from 'http-status';
import { AttendanceService } from './attendance.service';
import catchAsync from '@infra/http/express/utils/catch-async';
import pickValidFields from '@shared/validator/pickValidFields';
import sendResponse from '@infra/http/express/utils/sendResponse';

export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
  list = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const options: any = pickValidFields(req.query, ['limit', 'page', 'search', 'employee_id', 'from', 'to']);

    const data = await this.attendanceService.list(options);
    const meta = await this.attendanceService.count(options);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Attendance data fetched successfully.',
      data,
      meta,
    });
  });

  getById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const attendance = await this.attendanceService.getById(Number(req.params.id));

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Attendance data fetched successfully.',
      data: attendance,
    });
  });

  create = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const attendance = await this.attendanceService.create(req.body);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Attendance saved successfully.',
      data: attendance,
    });
  });

  update = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const attendance = await this.attendanceService.update(Number(req.params.id), req.body);

    res.status(status.OK).json({
      success: true,
      message: 'Attendance updated successfully.',
      data: attendance,
    });
  });

  delete = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await this.attendanceService.delete(Number(req.params.id));

    res.status(status.OK).json({
      success: true,
      message: 'Attendance deleted successfully.',
    });
  });
}
