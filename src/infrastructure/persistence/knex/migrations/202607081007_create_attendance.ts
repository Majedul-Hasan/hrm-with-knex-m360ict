import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('attendance', table => {
    table.increments('id').primary();

    table.date('attendanceDate').notNullable();

    table.timestamp('checkInTime').notNullable();

    table.timestamp('checkOutTime');

    table.string('ip');

    table.text('comment');

    table.integer('punchBy').unsigned();

    table.decimal('totalHour', 5, 2);

    table.string('inTimeStatus');

    table.string('outTimeStatus');

    table.boolean('status').defaultTo(true);

    table.timestamps(true, true);

    table.integer('employeeId').unsigned().notNullable().references('id').inTable('employee').onDelete('CASCADE');

    table.unique(['employeeId', 'attendanceDate']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attendance');
}
