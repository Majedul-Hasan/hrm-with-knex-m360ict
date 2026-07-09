import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('employee', table => {
    table.increments('id').primary();
    table.string('employeeId').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName');
    table.string('email').unique();
    table.string('phone').unique();
    table.string('street');
    table.string('city');
    table.string('state');
    table.string('zipCode');
    table.string('country');
    table.date('dateOfBirth').notNullable();
    table.date('joinDate').notNullable();
    table.date('leaveDate');
    table.decimal('salary', 12, 2).notNullable();
    table.string('bloodGroup');
    table.string('profileImage');
    table.integer('employmentStatusId').unsigned().references('id').inTable('employment_status').onDelete('SET NULL');
    table.integer('departmentId').unsigned().references('id').inTable('department').onDelete('SET NULL');

    table.integer('designationId').unsigned().references('id').inTable('designation').onDelete('SET NULL');

    table.integer('hrUserId').unsigned().references('id').inTable('hr_user').onDelete('SET NULL');

    table.integer('weeklyHolidayId').unsigned().references('id').inTable('weekly_holiday').onDelete('SET NULL');
    table.boolean('status').defaultTo(true);
    table.timestamp('deleted_at').nullable().index();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('employee');
}
