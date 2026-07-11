import { IPaginationOptions } from '@shared/helpers/pagination';
import { AttendanceReport, AttendanceReportFilter } from './report.types';
import { TMeta } from '@infra/http/express/utils/sendResponse';
import { ReportRepository } from './report.repository';

export class ReportService {
  constructor(private readonly repository: ReportRepository) {}

  async attendanceReport(
    query: IPaginationOptions &
      AttendanceReportFilter & {
        search?: string;
      }
  ): Promise<{ data: AttendanceReport[]; meta: TMeta }> {
    const { meta, data } = await this.repository.attendanceReport(query);

    return {
      meta,
      data,
    };
  }
}
