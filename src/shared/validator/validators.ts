import Joi from 'joi';

export const uuid = Joi.string().uuid();

export const requiredUuid = uuid.required();

export const email = Joi.string().email().trim().lowercase();

export const phone = Joi.string().trim();

export const pagination = {
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
};
