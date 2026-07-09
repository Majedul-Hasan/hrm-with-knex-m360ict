import { IPaginationOptions } from '@shared/helpers/pagination';
import { RoleRepository } from './role.repository';

export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

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
