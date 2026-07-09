import { IPaginationOptions } from '@shared/helpers/pagination';
import { EmploymentStatusRepository } from './employmentStatus.repository';

export class EmploymentStatusService {
  constructor(private readonly repository: EmploymentStatusRepository) {}

  async list(
    query: IPaginationOptions & {
      search?: string;
    }
  ) {
    const { meta, data } = await this.repository.list(query);

    return {
      meta,
      data,
    };
  }
}
