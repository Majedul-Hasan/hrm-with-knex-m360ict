import { DatabaseError } from 'pg';
import { IGenericErrorItem } from '@shared/errors/types/GenericErrorResponse';

const parseForeignKeyViolationError = (error: DatabaseError): IGenericErrorItem[] => {
  return [
    {
      path: error.constraint ?? '',
      message: error.detail ?? 'Foreign key constraint violated.',
    },
  ];
};

export default parseForeignKeyViolationError;
