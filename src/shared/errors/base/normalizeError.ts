import Joi from 'joi';
import AppError from './AppError';
import handleJoiError from '../handlers/joi/handleJoiError';
import handlePostgresError from '../handlers/postgres/handlePostgresError';

const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  if (error instanceof Joi.ValidationError) {
    const simplified = handleJoiError(error);

    return new AppError(simplified.statusCode, simplified.message, simplified.errorMessages);
  }

  // const mongooseError = handleMongooseError(error);
  // if (mongooseError) return mongooseError;
  // const prismaError = handlePrismaError(error);
  // if (prismaError) return prismaError;

  const postgresError = handlePostgresError(error);
  if (postgresError) {
    return postgresError;
  }

  if (error instanceof SyntaxError) {
    return new AppError(400, 'Invalid JSON payload');
  }
  if (error instanceof Error) {
    return new AppError(500, error.message || 'Internal server error', null, false);
  }
  return new AppError(500, 'Internal server error', null, false);
};

export default normalizeError;
