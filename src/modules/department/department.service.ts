import { IPaginationOptions } from '@shared/helpers/pagination';
import { DepartmentRepository } from './department.repository';

export class DepartmentService {
  constructor(private readonly repository: DepartmentRepository) {}

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
