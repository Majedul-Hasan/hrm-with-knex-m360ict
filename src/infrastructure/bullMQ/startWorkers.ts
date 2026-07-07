import redisConnect from '../cache/redis/redis';
redisConnect();

import './workers/mailWorkers';
