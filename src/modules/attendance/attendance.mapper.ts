import { Attendance, AttendanceResponse } from './attendance.types';

export const attendanceMapper = (attendance: Attendance): AttendanceResponse => ({
  id: attendance.id,

  employeeId: attendance.employeeId,

  attendanceDate: attendance.attendanceDate,

  checkInTime: attendance.checkInTime,

  checkOutTime: attendance.checkOutTime,

  ip: attendance.ip,

  comment: attendance.comment,

  punchBy: attendance.punchBy,

  totalHour: attendance.totalHour,

  inTimeStatus: attendance.inTimeStatus,

  outTimeStatus: attendance.outTimeStatus,

  status: attendance.status,

  createdAt: attendance.createdAt,

  updatedAt: attendance.updatedAt,
});

export const attendanceListMapper = (attendances: Attendance[]): AttendanceResponse[] =>
  attendances.map(attendanceMapper);
