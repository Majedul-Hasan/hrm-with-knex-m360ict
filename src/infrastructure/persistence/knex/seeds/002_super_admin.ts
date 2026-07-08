import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing records
  await knex('user').del();

  const superAdminRole = await knex('role').where({ name: 'SUPER_ADMIN' }).first();

  if (!superAdminRole) {
    throw new Error('SUPER_ADMIN role not found');
  }

  const passwordHash = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD!,
    Number(process.env.BCRYPT_SALT_ROUNDS || 12)
  );

  await knex('user').insert({
    firstName: 'Super',
    lastName: 'Admin',
    userName: 'superadmin',
    email: 'admin@360ict.com',
    passwordHash,
    employeeId: 'EMP0001',
    status: true,
    created_at: new Date(),
    updated_at: new Date(),
    roleId: superAdminRole.id,
    weeklyHolidayId: 1,
  });
}
