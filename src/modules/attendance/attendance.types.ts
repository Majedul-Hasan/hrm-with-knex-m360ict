import { IPaginationOptions } from '@shared/helpers/pagination';
import { ATTENDANCE_IN_STATUS, ATTENDANCE_OUT_STATUS } from './attendance.constants';

export type AttendanceInStatus = (typeof ATTENDANCE_IN_STATUS)[keyof typeof ATTENDANCE_IN_STATUS];

export type AttendanceOutStatus = (typeof ATTENDANCE_OUT_STATUS)[keyof typeof ATTENDANCE_OUT_STATUS];

export interface Attendance {
  id: number;

  employeeId: number;

  attendanceDate: string;

  checkInTime: string;

  checkOutTime: string | null;

  ip: string | null;

  comment: string | null;

  punchBy: number | null;

  totalHour: number | null;

  inTimeStatus: AttendanceInStatus | null;

  outTimeStatus: AttendanceOutStatus | null;

  status: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export interface CreateAttendanceDto {
  employeeId: number;

  attendanceDate: string;

  checkInTime: string;

  checkOutTime?: string;

  ip?: string;

  comment?: string;

  punchBy?: number;
}

export interface UpdateAttendanceDto {
  attendanceDate?: string;

  checkInTime?: string;

  checkOutTime?: string;

  ip?: string;

  comment?: string;

  punchBy?: number;

  status?: boolean;
}

export interface AttendanceFilter {
  employeeId?: number;
  from?: string;
  to?: string;
  search?: string;
}

export type ListAttendanceFilter = AttendanceFilter & IPaginationOptions;
export interface AttendanceResponse extends Attendance {}
