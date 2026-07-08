import Joi from 'joi';

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().required().messages({
      'string.empty': 'Username or email is required.',
      'any.required': 'Username or email is required.',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters.',
    }),
  }),
});

export const forgotPasswordSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email.',
      'any.required': 'Email is required.',
    }),
  }),
});

export const resetPasswordSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match.',
    }),
  }),
});

export const changePasswordSchema = Joi.object({
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
      'any.only': 'Passwords do not match.',
    }),
  }),
});
