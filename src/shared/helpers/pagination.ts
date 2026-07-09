import z from 'zod';
type SortOrder = 'asc' | 'desc';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

export type IPaginationOptions = z.infer<typeof paginationSchema>;

const calculatePagination = (options: unknown): PaginationResult => {
  const parsed = paginationSchema.parse(options);
  const { page, limit, sortBy, sortOrder } = parsed;
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
