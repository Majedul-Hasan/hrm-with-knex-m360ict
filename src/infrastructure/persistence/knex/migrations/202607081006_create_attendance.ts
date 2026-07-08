import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('attendance', table => {
    table.increments('id').primary();

    table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');

    table.date('attendanceDate').notNullable();

    table.timestamp('checkInTime').notNullable();

    table.timestamp('checkOutTime');

    table.string('ip');

    table.text('comment');

    table.integer('punchBy').unsigned();

    table.float('totalHour');

    table.string('inTimeStatus');

    table.string('outTimeStatus');

    table.boolean('status').defaultTo(true);

    table.timestamps(true, true);

    table.unique(['userId', 'attendanceDate']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attendance');
}
