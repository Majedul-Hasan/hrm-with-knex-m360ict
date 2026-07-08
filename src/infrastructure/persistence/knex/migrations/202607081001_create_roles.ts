import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role', table => {
    table.increments('id').primary();

    table.string('name').notNullable().unique();

    table.string('description');

    table.boolean('status').defaultTo(true);

    table.timestamp('createdAt').defaultTo(knex.fn.now());

    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('department');
}
