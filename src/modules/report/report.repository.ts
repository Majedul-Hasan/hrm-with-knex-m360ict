import db from '@infra/persistence/knex/knex';

import { IPaginationOptions } from '@shared/helpers/pagination';
import { TMeta } from '@infra/http/express/utils/sendResponse';

import { AttendanceReport, AttendanceReportFilter } from './report.types';

export class ReportRepository {
  async attendanceReport(
    filter: IPaginationOptions &
      AttendanceReportFilter & {
        search?: string;
      }
  ): Promise<{ data: AttendanceReport[]; meta: TMeta }> {
    console.log(15, filter);
    const query = db('employee as e')
      .leftJoin('attendance as a', 'a.employeeId', 'e.id')
      .select('e.id as employeeId', db.raw(`CONCAT(e."firstName", ' ', COALESCE(e."lastName", '')) as name`))
      .count('a.id as daysPresent')
      .select(
        db.raw(`
          SUM(
            CASE
              WHEN a."checkInTime" > '09:45:00'
              THEN 1
              ELSE 0
            END
          ) as "timesLate"
        `)
      )
      .whereRaw(`TO_CHAR(a."attendanceDate", 'YYYY-MM') = ?`, [filter.month]);

    if (filter.employeeId) {
      query.andWhere('e.id', filter.employeeId);
    }

    if (filter.search) {
      query.andWhere(function () {
        this.whereILike('e.firstName', `%${filter.search}%`).orWhereILike('e.lastName', `%${filter.search}%`);
      });
    }

    query.groupBy('e.id', 'e.firstName', 'e.lastName').orderBy('e.firstName');

    const countResult = await db('employee as e')
      .modify(qb => {
        if (filter.employeeId) {
          qb.where('e.id', filter.employeeId);
        }

        if (filter.search) {
          qb.where(function () {
            this.whereILike('e.firstName', `%${filter.search}%`).orWhereILike('e.lastName', `%${filter.search}%`);
          });
        }
      })
      .countDistinct('e.id as total')
      .first();

    const total = Number(countResult?.total ?? 0);

    const rows = await query
      .clone()
      .limit(filter.limit)
      .offset((filter.page - 1) * filter.limit);

    const dataS: AttendanceReport[] = rows.map(row => ({
      employeeId: Number(row.employeeId),
      name: String(row.name),
      daysPresent: Number(row.daysPresent),
      timesLate: Number(row.timesLate),
    }));

    return {
      data: dataS as AttendanceReport[],
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
        totalPage: Math.ceil(total / filter.limit),
      },
    };
  }
}
