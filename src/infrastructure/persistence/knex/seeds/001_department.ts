import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('department').del();

  await knex('department').insert([
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Information Technology' },
    { id: 4, name: 'Finance & Accounts' },
    { id: 5, name: 'Sales' },
    { id: 6, name: 'Marketing' },
    { id: 7, name: 'Customer Support' },
    { id: 8, name: 'Administration' },
    { id: 9, name: 'Operations' },
    { id: 10, name: 'Procurement' },
    { id: 11, name: 'Legal & Compliance' },
    { id: 12, name: 'Research & Development' },
    { id: 13, name: 'Quality Assurance' },
    { id: 14, name: 'Business Development' },
    { id: 15, name: 'Product Management' },
  ]);
}
