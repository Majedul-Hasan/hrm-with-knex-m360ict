import db from '@infra/persistence/knex/knex';
import { BaseRepository } from '@infra/persistence/repositories/base.repository';
import { UserModel } from './hr-user.types';
import { IPaginationOptions } from '@shared/helpers/pagination';

export class HrUserRepository extends BaseRepository<UserModel> {
  constructor() {
    super('user');
  }

  async findByEmployeeId(employeeId: string) {
    return db('user').where({ employeeId }).first();
  }

  async existsByEmail(email: string) {
    const user = await db('user').where({ email }).first();

    return !!user;
  }

  async existsByEmployeeId(employeeId: string) {
    const user = await db('user').where({ employeeId }).first('id');

    return !!user;
  }

  async softDelete(id: string) {
    return db('user').where({ id }).update({
      deleted_at: new Date(),
    });
  }

  async changeStatus(id: string, status: string) {
    const [user] = await db('user').where({ id }).update({ status }).returning('*');

    return user;
  }

  async assignRole(id: string, roleId: string) {
    const [user] = await db('user').where({ id }).update({ roleId }).returning('*');

    return user;
  }

  async list({
    page = 1,
    limit = 25,
    search,
  }: IPaginationOptions & {
    search?: string;
  }) {
    const query = db('user as u').leftJoin('role as r', 'u.roleId', 'r.id').select('u.*', 'r.name as roleName');

    if (search) {
      query.where(function () {
        this.whereILike('u.firstName', `%${search}%`)
          .orWhereILike('u.lastName', `%${search}%`)
          .orWhereILike('u.email', `%${search}%`)
          .orWhereILike('u.employeeId', `%${search}%`);
      });
    }

    // Count query (clone before adding pagination)
    const countQuery = query.clone().clearSelect().countDistinct('u.id as total');

    // Data query
    const data = await query.limit(limit).offset((page - 1) * limit);

    const [{ total }] = await countQuery;

    return {
      meta: {
        total: Number(total),
        page,
        limit,
        totalPage: Math.ceil(Number(total) / limit),
      },
      data,
    };
  }
}
