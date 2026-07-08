import { IRequestValidator } from '@infra/http/express/middlewares/validateRequest';
import { ZodSchema } from 'zod';

export class ZodValidator implements IRequestValidator {
  constructor(private readonly schema: ZodSchema) {}

  async validate(data: unknown): Promise<void> {
    await this.schema.parseAsync(data);
  }
}
