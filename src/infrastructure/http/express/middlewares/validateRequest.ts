import { NextFunction, Request, Response } from 'express';
export interface IRequestValidator {
  validate(data: unknown): Promise<void>;
}
const validateRequest = (validator: IRequestValidator) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validator.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRequest;
