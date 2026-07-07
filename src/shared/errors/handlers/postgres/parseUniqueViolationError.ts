import { DatabaseError } from 'pg';
import { IGenericErrorItem } from '@shared/errors/types/GenericErrorResponse';

const parseUniqueViolationError = (error: DatabaseError): IGenericErrorItem[] => {
  return [
    {
      path: error.constraint ?? '',
      message: error.detail ?? 'Duplicate value already exists.',
    },
  ];
};

export default parseUniqueViolationError;
