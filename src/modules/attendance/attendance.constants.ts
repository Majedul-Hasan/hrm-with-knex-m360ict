export const ATTENDANCE = {
  CHECK_IN_START_TIME: '09:00:00',
  LATE_CHECK_IN_TIME: '09:45:00',
  CHECK_OUT_TIME: '18:00:00',
} as const;

export const ATTENDANCE_IN_STATUS = {
  ON_TIME: 'ON_TIME',
  LATE: 'LATE',
} as const;

export const ATTENDANCE_OUT_STATUS = {
  ON_TIME: 'ON_TIME',
  EARLY: 'EARLY',
} as const;

export const ATTENDANCE_ORDER_BY = {
  CREATED_AT: 'createdAt',
  ATTENDANCE_DATE: 'attendanceDate',
  CHECK_IN_TIME: 'checkInTime',
} as const;

export const DEFAULT_ATTENDANCE_PAGE = 1;

export const DEFAULT_ATTENDANCE_LIMIT = 10;

export const MAX_ATTENDANCE_LIMIT = 100;
