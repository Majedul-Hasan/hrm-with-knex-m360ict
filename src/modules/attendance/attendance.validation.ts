import Joi from 'joi';

export const createAttendanceSchema = Joi.object({
  body: Joi.object({
    employeeId: Joi.number().integer().positive().required(),
    attendanceDate: Joi.date().iso().required(),

    checkInTime: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        'string.pattern.base': 'checkInTime must be in HH:mm:ss format',
      }),

    checkOutTime: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .optional()
      .messages({
        'string.pattern.base': 'checkOutTime must be in HH:mm:ss format',
      }),

    ip: Joi.string().ip().optional(),

    comment: Joi.string().trim().max(1000).optional(),

    punchBy: Joi.number().integer().positive().optional(),
  }),
});

export const updateAttendanceSchema = Joi.object({
  body: Joi.object({
    attendanceDate: Joi.date().iso().optional(),

    checkInTime: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .optional()
      .messages({
        'string.pattern.base': 'checkInTime must be in HH:mm:ss format',
      }),

    checkOutTime: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .optional()
      .messages({
        'string.pattern.base': 'checkOutTime must be in HH:mm:ss format',
      }),

    ip: Joi.string().ip().optional(),

    comment: Joi.string().trim().max(1000).optional(),

    punchBy: Joi.number().integer().positive().optional(),

    status: Joi.boolean().optional(),
  }).min(1),
});

export const attendanceFilterSchema = Joi.object({
  query: Joi.object({
    employeeId: Joi.number().integer().positive().optional(),
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(25),
  }),
});
