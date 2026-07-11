import http from 'http';

import config from '@shared/config/env.const';

import { connectDatabase, disconnectDatabase } from '@infra/persistence/knex/database';
import logger from '@infra/logging/logger';
import redisConnect from '@infra/cache/redis/redis';
import app from './app';

const PORT = config.port ?? 5001;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    redisConnect();

    const httpServer = http.createServer(app);

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server running at http://localhost:${PORT}`);
    });

    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received.`);

      httpServer.close(async () => {
        await disconnectDatabase();

        logger.info('Application shutdown complete.');

        process.exit(0);
      });
    };

    process.on('SIGINT', () => void shutdown('SIGINT'));
    process.on('SIGTERM', () => void shutdown('SIGTERM'));
  } catch (error) {
    logger.error('Application startup failed.', error);

    process.exit(1);
  }
};

void startServer();
