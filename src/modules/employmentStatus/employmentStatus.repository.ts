import db from '@infra/persistence/knex/knex';

import { IPaginationOptions } from '@shared/helpers/pagination';

export class EmploymentStatusRepository {
  async list({
    page = 1,
    limit = 25,
    search,
  }: IPaginationOptions & {
    search?: string;
  }) {
    const query = db('employment_status').select();

    if (search) {
      query.where(function () {
        this.whereILike('name', `%${search}%`);
      });
    }

    // Count query (clone before adding pagination)
    const countQuery = query.clone().clearSelect().countDistinct('id as total');

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
