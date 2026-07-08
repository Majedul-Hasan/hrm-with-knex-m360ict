import type { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '..', '.env'),
});
const dbConfig: Knex.Config = {
  client: 'pg',

  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  pool: {
    min: Number(process.env.DB_POOL_MIN),
    max: Number(process.env.DB_POOL_MAX),
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
