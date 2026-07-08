import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('weekly_holiday', table => {
    table.increments('id').primary();

    table.string('name').notNullable();

    table.string('startDay').notNullable();

    table.string('endDay').notNullable();

    table.boolean('status').defaultTo(true);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('weekly_holiday');
}
