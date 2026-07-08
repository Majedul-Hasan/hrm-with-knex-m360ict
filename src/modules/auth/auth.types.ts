export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: AuthUser;
}

export interface AuthUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string | null;
  phone: string | null;
  employeeId: string | null;
  roleId: number | null;
  roleName: string | null;
  departmentId: number | null;
  designationId: number | null;
  employmentStatusId: number | null;
  weeklyHolidayId: number | null;
  profileImage: string | null;
  status: boolean;
}

export interface JwtPayload {
  id: number;
  userName: string;
  email: string | null;
  roleId: number | null;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  passwordHash: string;
  email: string | null;
  phone: string | null;
  employeeId: string | null;
  profileImage: string | null;
  roleId: number | null;
  roleName: string | null;
  departmentId: number | null;
  designationId: number | null;
  employmentStatusId: number | null;
  weeklyHolidayId: number | null;
  status: boolean;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpiresAt?: Date | null;
  passwordChangedAt?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}
