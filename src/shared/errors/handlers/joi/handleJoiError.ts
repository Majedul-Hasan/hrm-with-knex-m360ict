import { IGenericErrorResponse, IGenericErrorItem } from '@shared/errors/types/GenericErrorResponse';
import Joi from 'joi';

const handleJoiError = (error: Joi.ValidationError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorItem[] = error.details.map(detail => ({
    path: detail.path.join('.'),
    message: detail.message.replace(/"/g, ''),
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleJoiError;
