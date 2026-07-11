import { IPaginationOptions } from '@shared/helpers/pagination';
import { RoleRepository } from './role.repository';
import { AttendanceReport } from '@modules/report/report.types';
import { TMeta } from '@infra/http/express/utils/sendResponse';

export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async list(
    query: IPaginationOptions & {
      search?: string;
    }
  ): Promise<{ data: AttendanceReport[]; meta: TMeta }> {
    const { meta, data } = await this.repository.list(query);

    return {
      meta,
      data,
    };
  }
}
