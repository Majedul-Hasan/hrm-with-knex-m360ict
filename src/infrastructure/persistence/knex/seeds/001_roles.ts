import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const roles = [
    {
      name: 'SUPER_ADMIN',
      description: 'System administrator',
    },
    {
      name: 'HR_ADMIN',
      description: 'HR administrator',
    },
    {
      name: 'MANAGER',
      description: 'Department manager',
    },
    {
      name: 'EMPLOYEE',
      description: 'Employee',
    },
  ];

  for (const role of roles) {
    const exists = await knex('role').where({ name: role.name }).first();

    if (!exists) {
      await knex('role').insert(role);
    }
  }
}
