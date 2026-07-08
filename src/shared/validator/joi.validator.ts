import { IRequestValidator } from '@infra/http/express/middlewares/validateRequest';
import Joi from 'joi';

export class JoiValidator implements IRequestValidator {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  async validate(data: unknown): Promise<void> {
    const { error } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw error;
    }
  }
}
