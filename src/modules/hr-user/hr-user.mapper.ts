export class HrUserMapper {
  static toResponse(user: any) {
    return {
      id: user.id,
      employeeId: user.employeeId,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone,
      role: user.roleId
        ? {
            id: user.roleId,
            name: user.roleName,
          }
        : null,
      status: user.status,
      isBlocked: user.isBlocked,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toList(users: any[]) {
    return users.map(user => this.toResponse(user));
  }

  static toDetails(user: any) {
    return {
      ...this.toResponse(user),

      department: user.departmentId
        ? {
            id: user.departmentId,
            name: user.departmentName,
          }
        : null,

      designation: user.designationId
        ? {
            id: user.designationId,
            name: user.designationName,
          }
        : null,

      manager: user.managerId
        ? {
            id: user.managerId,
            name: user.managerName,
          }
        : null,

      joinedAt: user.joined_at ?? null,

      lastLoginAt: user.lastLogin_at ?? null,
    };
  }

  static toProfile(user: any) {
    return {
      id: user.id,

      employeeId: user.employeeId,

      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),

      email: user.email,
      phone: user.phone,

      avatar: user.avatar,

      role: user.roleName,

      department: user.departmentName,

      designation: user.designationName,

      status: user.status,

      isEmailVerified: user.isEmailVerified,
    };
  }

  static toDropdown(users: any[]) {
    return users.map(user => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`.trim(),
    }));
  }
}
