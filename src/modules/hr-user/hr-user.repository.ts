import db from '@infra/persistence/knex/knex';
import { Knex } from 'knex';
import { BaseRepository } from '@infra/persistence/repositories/base.repository';
import { UserModel } from './hr-user.types';
import { IPaginationOptions } from '@shared/helpers/pagination';

export class HrUserRepository extends BaseRepository<UserModel> {
  constructor() {
    super('hr_user');
  }

  async findByEmployeeId(employeeId: string) {
    return db('employee as e')
      .leftJoin('hr_user as u', 'e.hrUserId', 'u.id')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .where('e.employeeId', employeeId)
      .select(
        'e.*',
        // 'u.userName',
        // 'u.email',
        // 'u.phone',
        // 'u.firstName',
        // 'u.lastName',
        'u.roleId',
        'r.name as roleName'
      )
      .first();
  }

  async existsByEmail(email: string) {
    const user = await db('hr_user').where({ email }).first('id');

    return !!user;
  }

  async existsByEmployeeId(employeeId: string) {
    const employee = await db('employee').where({ employeeId }).first('id');

    return !!employee;
  }

  async softDelete(id: number, trx?: Knex.Transaction): Promise<void> {
    const query = trx ?? db;

    await query('employee').where({ hrUserId: id }).update({
      deleted_at: new Date(),
      status: false,
      updated_at: new Date(),
    });

    await query('hr_user').where({ id }).update({
      status: false,
      updated_at: new Date(),
    });
  }

  async changeStatus(id: number, status: boolean, trx?: Knex.Transaction): Promise<void> {
    const query = trx ?? db;

    await query('hr_user').where({ id }).update({
      status,
      updated_at: new Date(),
    });

    await query('employee').where({ hrUserId: id }).update({
      status,
      updated_at: new Date(),
    });
  }

  async assignRole(id: string, roleId: string) {
    const [user] = await db('hr_user').where({ id }).update({ roleId }).returning('*');

    return user;
  }

  async list({
    page = 1,
    limit = 25,
    search,
  }: IPaginationOptions & {
    search?: string;
  }) {
    const query = db('employee as e')
      .leftJoin('hr_user as u', 'e.hrUserId', 'u.id')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .leftJoin('department as d', 'e.departmentId', 'd.id')
      .leftJoin('designation as des', 'e.designationId', 'des.id')
      .leftJoin('employment_status as es', 'e.employmentStatusId', 'es.id')
      .select(
        'e.*',
        'u.userName',
        'u.email',
        'u.phone',
        'u.status',
        'u.roleId',
        'r.name as roleName',
        'd.name as departmentName',
        'des.name as designationName',
        'es.name as employmentStatusName'
      );

    if (search) {
      query.where(function () {
        this.whereILike('e.employeeId', `%${search}%`)
          .orWhereILike('u.firstName', `%${search}%`)
          .orWhereILike('u.lastName', `%${search}%`)
          .orWhereILike('u.email', `%${search}%`)
          .orWhereILike('u.userName', `%${search}%`);
      });
    }
    // Count query (clone before adding pagination)
    const countQuery = query.clone().clearSelect().countDistinct('e.id as total');
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
