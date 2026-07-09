import { IPaginationOptions } from '@shared/helpers/pagination';
import { DesignationRepository } from './designation.repository';

export class DesignationService {
  constructor(private readonly repository: DesignationRepository) {}

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
