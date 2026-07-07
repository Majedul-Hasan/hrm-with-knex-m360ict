import env from '@shared/config/env.const';
import type { Knex } from 'knex';
import path from 'path';

const dbConfig: Knex.Config = {
  client: 'pg',

  connection: {
    host: env.db.host,
    port: Number(env.db.port),
    user: env.db.usr,
    password: env.db.password,
    database: env.db.name,
  },

  pool: {
    min: Number(env.db.poolMin),
    max: Number(env.db.poolMax),
  },

  migrations: {
    directory: path.join(__dirname, 'migrations'),
    extension: 'ts',
  },

  seeds: {
    directory: path.join(__dirname, 'seeds'),
    extension: 'ts',
  },
};

export default dbConfig;
