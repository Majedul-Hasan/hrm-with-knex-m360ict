import db from '@infra/persistence/knex/knex';
import { LoginUser } from './auth.types';

export class AuthRepository {
  async findById(id: number) {
    return db('user as u')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .where('u.id', id)
      .select('u.*', 'r.name as roleName')
      .first();
  }

  async findByEmail(email: string) {
    return db('user').where({ email }).first();
  }

  async findByUserName(userName: string) {
    return db('user').where({ userName }).first();
  }

  async findByLogin(login: string) {
    return db('user as u')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .where('u.email', login)
      .orWhere('u.userName', login)
      .select('u.*', 'r.name as roleName')
      .first();
  }
  async updatePassword(id: number, passwordHash: string) {
    return db('user').where({ id }).update({
      passwordHash,
      passwordChangedAt: new Date(),
      updated_at: new Date(),
    });
  }

  async saveResetToken(id: number, token: string, expiresAt: Date) {
    return db('user').where({ id }).update({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: expiresAt,
      updated_at: new Date(),
    });
  }

  async clearResetToken(id: number) {
    return db('user').where({ id }).update({
      resetPasswordToken: null,
      resetPasswordTokenExpiresAt: null,
      updated_at: new Date(),
    });
  }

  async findByResetToken(token: string): Promise<LoginUser | undefined> {
    return db<LoginUser>('user')
      .where({
        resetPasswordToken: token,
      })
      .where('resetPasswordTokenExpiresAt', '>', new Date())
      .first();
  }
}
