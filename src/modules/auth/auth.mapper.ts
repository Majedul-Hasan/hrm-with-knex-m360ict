import { AuthUser, LoginResponse, LoginUser } from './auth.types';

export class AuthMapper {
  /**
   * Remove sensitive fields from user object
   */
  static toAuthUser(user: LoginUser): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      employeeId: user.employeeId,
      roleId: user.roleId,
      departmentId: user.departmentId,
      roleName: user.roleName,
      designationId: user.designationId,
      employmentStatusId: user.employmentStatusId,
      weeklyHolidayId: user.weeklyHolidayId,
      profileImage: user.profileImage,
      status: user.status,
    };
  }

  /**
   * Login Response
   */
  static toLoginResponse(user: LoginUser, accessToken: string, expiresIn: string): LoginResponse {
    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
      user: this.toAuthUser(user),
    };
  }
}
