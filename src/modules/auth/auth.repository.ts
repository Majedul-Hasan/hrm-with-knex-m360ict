import db from '@infra/persistence/knex/knex';
import { Knex } from 'knex';
import { LoginUser } from './auth.types';

export class AuthRepository {
  async findById(id: number): Promise<LoginUser | undefined> {
    return db('hr_user as u')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .select('u.*', 'r.name as roleName')
      .where('u.id', id)
      .first();
  }

  async findByEmail(email: string): Promise<LoginUser | undefined> {
    return db<LoginUser>('hr_user').where({ email }).first();
  }

  async findByUserName(userName: string): Promise<LoginUser | undefined> {
    return db<LoginUser>('hr_user').where({ userName }).first();
  }

  async findByLogin(login: string): Promise<LoginUser | undefined> {
    return db('hr_user as u')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .select('u.*', 'r.name as roleName')
      .where(builder => {
        builder.where('u.email', login).orWhere('u.userName', login);
      })
      .first();
  }

  async updatePassword(id: number, passwordHash: string, trx?: Knex.Transaction): Promise<number> {
    const query = trx ?? db;
    return query('hr_user').where({ id }).update({
      passwordHash,
      passwordChangedAt: new Date(),
      updated_at: new Date(),
    });
  }

  async saveResetToken(id: number, token: string, expiresAt: Date): Promise<number> {
    return db('hr_user').where({ id }).update({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: expiresAt,
      updated_at: new Date(),
    });
  }

  async clearResetToken(id: number, trx?: Knex.Transaction): Promise<number> {
    const query = trx ?? db;
    return query('hr_user').where({ id }).update({
      resetPasswordToken: null,
      resetPasswordTokenExpiresAt: null,
      updated_at: new Date(),
    });
  }

  async findByResetToken(token: string): Promise<LoginUser | undefined> {
    return db<LoginUser>('hr_user')
      .where({ resetPasswordToken: token })
      .where('resetPasswordTokenExpiresAt', '>', new Date())
      .first();
  }
}
