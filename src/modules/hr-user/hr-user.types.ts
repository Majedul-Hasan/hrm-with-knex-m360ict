export interface HrUserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateHrUserInput {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  userName?: string;
  weeklyHolidayId?: string;
  departmentId?: string;
}

export interface UpdateHrUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface ChangeUserStatusInput {
  status: string;
}

export interface AssignRoleInput {
  roleId: string;
}

export interface HrUserResponse {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  status: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
}

export interface UserModel {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password: string;
  roleId: string;
  roleName?: string;
  departmentId: string | null;
  departmentName?: string;
  designationId: string | null;
  designationName?: string;
  managerId: string | null;
  managerName?: string;
  avatar: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  isBlocked: boolean;
  isEmailVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
