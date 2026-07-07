import { DatabaseError } from 'pg';
import { IGenericErrorItem } from '@shared/errors/types/GenericErrorResponse';

const parseNotNullViolationError = (error: DatabaseError): IGenericErrorItem[] => {
  return [
    {
      path: error.column ?? '',
      message: `${error.column} cannot be null.`,
    },
  ];
};

export default parseNotNullViolationError;
