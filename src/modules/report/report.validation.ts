import Joi from 'joi';

export const attendanceReportSchema = Joi.object({
  query: Joi.object({
    month: Joi.string()
      .pattern(/^\d{4}-\d{2}$/)
      .required(),

    employeeId: Joi.number().integer().positive().optional(),
  }),
});
