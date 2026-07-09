import Joi from 'joi';

export const createHrUserSchema = Joi.object({
  body: Joi.object({
    employeeId: Joi.string().trim().required(),
    userName: Joi.string().trim().optional(),
    firstName: Joi.string().trim().max(100).required(),
    lastName: Joi.string().trim().max(100).required(),
    email: Joi.string().email().lowercase().trim().required(),
    phone: Joi.string().trim().allow('', null),
    roleId: Joi.string().required(),
    departmentId: Joi.string().required(),
    weeklyHolidayId: Joi.string().optional(),
  }),
});

export const updateHrUserSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().trim().max(100),
    lastName: Joi.string().trim().max(100),
    email: Joi.string().email().lowercase().trim(),
    phone: Joi.string().trim().allow('', null),
    roleId: Joi.string(),
  }).min(1),

  params: Joi.object({
    id: Joi.string().required(),
  }),

  query: Joi.object({}),
});

export const getHrUserSchema = Joi.object({
  body: Joi.object({}),

  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),

  query: Joi.object({}),
});

export const deleteHrUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),

  query: Joi.object({}),
});

export const listHrUsersSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().trim(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }),
});

export const changeUserStatusSchema = Joi.object({
  body: Joi.object({
    status: Joi.boolean().required(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  }),
});

export const assignRoleSchema = Joi.object({
  body: Joi.object({
    roleId: Joi.string().required(),
  }),

  params: Joi.object({
    id: Joi.string().required(),
  }),
});
