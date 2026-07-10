import { ATTENDANCE, ATTENDANCE_IN_STATUS, ATTENDANCE_OUT_STATUS } from './attendance.constants';
import { AttendanceInStatus, AttendanceOutStatus } from './attendance.types';

const toMinutes = (time: string): number => {
  const [hour, minute] = time.split(':').map(Number);

  return hour * 60 + minute;
};

export const calculateTotalHour = (checkInTime: string, checkOutTime?: string | null): number | null => {
  if (!checkOutTime) {
    return null;
  }

  const inMinutes = toMinutes(checkInTime);
  const outMinutes = toMinutes(checkOutTime);

  if (outMinutes <= inMinutes) {
    return 0;
  }

  const totalMinutes = outMinutes - inMinutes;

  return Number((totalMinutes / 60).toFixed(2));
};

export const getInTimeStatus = (checkInTime: string): AttendanceInStatus => {
  return toMinutes(checkInTime) > toMinutes(ATTENDANCE.LATE_CHECK_IN_TIME)
    ? ATTENDANCE_IN_STATUS.LATE
    : ATTENDANCE_IN_STATUS.ON_TIME;
};

export const getOutTimeStatus = (checkOutTime?: string | null): AttendanceOutStatus | null => {
  if (!checkOutTime) {
    return null;
  }

  return toMinutes(checkOutTime) < toMinutes(ATTENDANCE.CHECK_OUT_TIME)
    ? ATTENDANCE_OUT_STATUS.EARLY
    : ATTENDANCE_OUT_STATUS.ON_TIME;
};
