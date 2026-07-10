import { Knex } from 'knex';
import db from '@infra/persistence/knex/knex';
import { BaseRepository } from '@infra/persistence/repositories/base.repository';

import { Attendance, AttendanceFilter, ListAttendanceFilter } from './attendance.types';

export class AttendanceRepository extends BaseRepository<Attendance> {
  constructor() {
    super('attendance');
  }

  async findByEmployeeAndDate(
    employeeId: number,
    attendanceDate: string,
    trx?: Knex.Transaction
  ): Promise<Attendance | undefined> {
    const query = trx ?? db;

    return query(this.table)
      .where({
        employeeId,
        attendanceDate,
      })
      .first();
  }

  async list(filter: ListAttendanceFilter, trx?: Knex.Transaction): Promise<Attendance[]> {
    const query = trx ?? db;

    const qb = query(this.table);

    if (filter.employeeId) {
      qb.where('employeeId', filter.employeeId);
    }

    if (filter.from) {
      qb.where('attendanceDate', '>=', filter.from);
    }

    if (filter.to) {
      qb.where('attendanceDate', '<=', filter.to);
    }

    qb.orderBy('attendanceDate', 'desc');

    if (filter.limit) {
      const page = filter.page ?? 1;

      qb.limit(filter.limit).offset((page - 1) * filter.limit);
    }

    return qb;
  }

  async count(filter: AttendanceFilter, trx?: Knex.Transaction): Promise<number> {
    const query = trx ?? db;

    const qb = query(this.table);

    if (filter.employeeId) {
      qb.where('employeeId', filter.employeeId);
    }

    if (filter.from) {
      qb.where('attendanceDate', '>=', filter.from);
    }

    if (filter.to) {
      qb.where('attendanceDate', '<=', filter.to);
    }

    const result = await qb.count<{ count: string }>('id as count').first();

    return Number(result?.count ?? 0);
  }
}

export const attendanceRepository = new AttendanceRepository();
