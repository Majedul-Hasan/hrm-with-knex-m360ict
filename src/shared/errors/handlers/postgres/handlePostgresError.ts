import status from 'http-status';
import { DatabaseError } from 'pg';

import parseUniqueViolationError from './parseUniqueViolationError';

import parseNotNullViolationError from './parseNotNullViolationError';
import parseCheckConstraintViolationError from './parseCheckConstraintViolationError';
import { ValidationError } from '@shared/errors/validation/ValidationError';
import AppError from '@shared/errors/base/AppError';
import parseForeignKeyViolationError from './parseForeignKeyViolationError';

const handlePostgresError = (error: unknown): AppError | null => {
  if (!(error instanceof DatabaseError)) {
    return null;
  }

  switch (error.code) {
    case '23505':
      return new AppError(status.CONFLICT, 'Conflict', parseUniqueViolationError(error));

    case '23503':
      return new AppError(status.CONFLICT, 'Foreign Key Violation', parseForeignKeyViolationError(error));

    case '23502':
      return new ValidationError('Validation Error', parseNotNullViolationError(error));

    case '23514':
      return new ValidationError('Validation Error', parseCheckConstraintViolationError(error));

    case '22P02':
      return new ValidationError('Invalid Input', [
        {
          path: '',
          message: error.message,
        },
      ]);

    default:
      return null;
  }
};

export default handlePostgresError;
