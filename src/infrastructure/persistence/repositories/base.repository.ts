import { Knex } from 'knex';
import db from '../knex/knex';

export abstract class BaseRepository<T> {
  constructor(protected readonly table: string) {}

  async findById(id: number, trx?: Knex.Transaction): Promise<T | undefined> {
    const query = trx ?? db;
    return (await query(this.table).where({ id }).first()) as T | undefined;
  }

  async create(payload: Partial<T>, trx?: Knex.Transaction): Promise<T> {
    const query = trx ?? db;
    const [row] = await query(this.table).insert(payload).returning('*');
    return row as T;
  }

  async update(id: number, payload: Partial<T>, trx?: Knex.Transaction): Promise<T> {
    const query = trx ?? db;

    const [row] = await query(this.table).where({ id }).update(payload).returning('*');
    return row as T;
  }

  async delete(id: number, trx?: Knex.Transaction): Promise<number> {
    const query = trx ?? db;
    return query(this.table).where({ id }).del();
  }

  async findOne(where: Partial<T>, trx?: Knex.Transaction): Promise<T | undefined> {
    const query = trx ?? db;
    return await query(this.table).where(where).first();
  }

  async exists(where: Partial<T>, trx?: Knex.Transaction): Promise<boolean> {
    const query = trx ?? db;
    const row = await query(this.table).where(where).first('id');

    return !!row;
  }
}
