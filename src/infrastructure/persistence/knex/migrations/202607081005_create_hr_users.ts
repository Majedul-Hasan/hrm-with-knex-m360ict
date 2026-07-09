import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hr_user', table => {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName');
    table.string('userName').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('phone').unique();
    table.string('passwordHash').notNullable();
    table.integer('roleId').unsigned().references('id').inTable('role').onDelete('SET NULL');
    table.boolean('status').defaultTo(true);
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordTokenExpiresAt');
    table.timestamp('passwordChangedAt');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('hr_user');
}

/*import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('userName').notNullable().unique();
    table.string('passwordHash').notNullable();
    table.string('email').unique();
    table.string('phone');
    table.string('street');
    table.string('city');
    table.string('state');
    table.string('zipCode');
    table.string('country');
    table.date('joinDate');
    table.date('leaveDate');
    table.string('employeeId').unique();
    table.string('bloodGroup');
    table.date('dateOfBirth');
    table.decimal('salary', 12, 2);
    table.string('profileImage');
    table.integer('roleId').unsigned().references('id').inTable('role').onDelete('SET NULL');
    table.integer('employmentStatusId').unsigned().references('id').inTable('employment_status').onDelete('SET NULL');
    table.integer('departmentId').unsigned().references('id').inTable('department').onDelete('SET NULL');
    table.integer('designationId').unsigned().references('id').inTable('designation').onDelete('SET NULL');
    table.integer('weeklyHolidayId').unsigned().references('id').inTable('weekly_holiday').onDelete('SET NULL');
    table.boolean('status').defaultTo(true);
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordTokenExpiresAt');
    table.timestamp('passwordChangedAt');
    table.timestamp('deleted_at').nullable().index();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user');
}
*/
