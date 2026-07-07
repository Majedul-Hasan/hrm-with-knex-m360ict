import config from '@shared/config/env.const';
import Redis, { RedisOptions } from 'ioredis';

export const redisOptions: RedisOptions = {
  host: config.redis.host || '127.0.0.1',
  port: config.redis.port ? config.redis.port : 6379,
  retryStrategy: (times: number) => {
    if (times > 5) return undefined;
    return Math.min(times * 100, 3000);
  },
  connectTimeout: 10000,
  keepAlive: 30000,
  maxRetriesPerRequest: null,
};
const redisUrl = config.redis.url || 'redis://localhost:6380';

export const redis = new Redis(redisOptions);
