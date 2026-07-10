import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from './attendance.repository';
import { createAttendanceRoutes } from './attendance.routes';
import { AttendanceService } from './attendance.service';

export const attendanceRepository = new AttendanceRepository();
export const attendanceService = new AttendanceService(attendanceRepository);

export const attendanceController = new AttendanceController(attendanceService);

export const attendanceRoutes = createAttendanceRoutes(attendanceController);
