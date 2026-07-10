export interface EmployeeModel {
  id: number;
  employeeId: string;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  dateOfBirth: Date;
  joinDate: Date;
  leaveDate?: Date | null;
  salary: string;
  bloodGroup?: string | null;
  profileImage?: string | null;
  employmentStatusId?: number | null;
  departmentId?: number | null;
  designationId?: number | null;
  weeklyHolidayId?: number | null;
  hrUserId?: number | null;
  status: boolean;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
