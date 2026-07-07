import { DatabaseError } from 'pg';
import { IGenericErrorItem } from '@shared/errors/types/GenericErrorResponse';

const parseCheckConstraintViolationError = (error: DatabaseError): IGenericErrorItem[] => {
  return [
    {
      path: error.constraint ?? '',
      message: error.detail ?? 'Check constraint violated.',
    },
  ];
};

export default parseCheckConstraintViolationError;
