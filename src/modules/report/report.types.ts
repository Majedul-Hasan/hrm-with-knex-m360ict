export interface AttendanceReport {
  employeeId: number;
  name: string;
  daysPresent: number;
  timesLate: number;
}

export interface AttendanceReportFilter {
  month: string;
  employeeId?: number;
}
