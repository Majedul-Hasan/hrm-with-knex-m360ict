import { Knex } from 'knex';

import db from '@infra/persistence/knex/knex';
import { BaseRepository } from '@infra/persistence/repositories/base.repository';
import { IPaginationOptions } from '@shared/helpers/pagination';
import { EmployeeModel } from './models/EmployeeModel';

export class EmployeeRepository extends BaseRepository<EmployeeModel> {
  constructor() {
    super('employee');
  }

  async findById(id: number) {
    console.log(id);
    return db('employee as e')
      .leftJoin('hr_user as u', 'e.hrUserId', 'u.id')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .leftJoin('department as d', 'e.departmentId', 'd.id')
      .leftJoin('designation as des', 'e.designationId', 'des.id')
      .leftJoin('employment_status as es', 'e.employmentStatusId', 'es.id')
      .leftJoin('weekly_holiday as wh', 'e.weeklyHolidayId', 'wh.id')
      .where('e.id', id)
      .select(
        'e.*',
        // 'u.userName',
        // 'u.email',
        // 'u.phone',
        // 'u.firstName',
        // 'u.lastName',
        'u.id as hrUserId',
        'u.roleId',
        'u.status as userStatus',
        'r.name as roleName',
        'd.name as departmentName',
        'des.name as designationName',
        'es.name as employmentStatusName',
        'wh.name as weeklyHolidayName'
      )
      .first();
  }

  async findByHrUserId(hrUserId: number) {
    return db('employee').where({ hrUserId }).first();
  }

  async existsByEmployeeId(employeeId: string): Promise<boolean> {
    const employee = await db('employee').where({ employeeId }).first('id');
    return !!employee;
  }

  async create(data: Partial<EmployeeModel>, trx?: Knex.Transaction) {
    const query = trx ?? db;
    const [employee] = await query('employee').insert(data).returning('*');
    return employee;
  }

  async updateByHrUserId(hrUserId: number, data: Partial<EmployeeModel>, trx?: Knex.Transaction) {
    const query = trx ?? db;
    const [employee] = await query('employee')
      .where({ hrUserId })
      .update({
        ...data,
        updated_at: new Date(),
      })
      .returning('*');
    return employee;
  }

  async softDeleteByHrUserId(hrUserId: number, trx?: Knex.Transaction) {
    const query = trx ?? db;
    return query('employee').where({ hrUserId }).update({
      deleted_at: new Date(),
      status: false,
      updated_at: new Date(),
    });
  }

  async changeStatusByHrUserId(hrUserId: number, status: boolean, trx?: Knex.Transaction) {
    const query = trx ?? db;

    return query('employee').where({ hrUserId }).update({
      status,
      updated_at: new Date(),
    });
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
        'u.firstName',
        'u.lastName',
        'u.status as userStatus',
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

    const countQuery = query.clone().clearSelect().countDistinct('e.id as total');
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
