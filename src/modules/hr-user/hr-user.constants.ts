export const HR_USER_DEFAULT_PAGE = 1;

export const HR_USER_DEFAULT_LIMIT = 25;

export const HR_USER_MAX_LIMIT = 100;

export const HR_USER_SEARCHABLE_FIELDS = ['employeeId', 'firstName', 'lastName', 'email', 'phone'] as const;

export const HR_USER_SORTABLE_FIELDS = [
  'createdAt',
  'updatedAt',
  'employeeId',
  'firstName',
  'lastName',
  'email',
] as const;

export const HR_USER_SELECT_COLUMNS = [
  'id',
  'employeeId',
  'firstName',
  'lastName',
  'email',
  'phone',
  'status',
  'isBlocked',
  'isEmailVerified',
  'createdAt',
  'updatedAt',
] as const;
export const HR_USER_MESSAGES = {
  CREATED: 'Employee created successfully.',
  UPDATED: 'Employee updated successfully.',
  DELETED: 'Employee deleted successfully.',
  RETRIEVED: 'Employee retrieved successfully.',
  LIST_RETRIEVED: 'Employees  retrieved successfully.',
  STATUS_UPDATED: 'Employee status updated successfully.',
  ROLE_ASSIGNED: 'Employee role assigned successfully.',
  PROFILE_RETRIEVED: 'Profile retrieved successfully.',
} as const;
