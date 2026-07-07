import logger from '@infra/logging/logger';
import db from './knex';

export const connectDatabase = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1');

    logger.info('PostgreSQL connected.');
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL.', error);

    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await db.destroy();

  logger.info('Database connection closed.');
};
