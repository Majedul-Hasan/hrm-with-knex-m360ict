import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('attendance', table => {
    table.dropColumn('checkInTime');
    table.dropColumn('checkOutTime');
  });

  await knex.schema.alterTable('attendance', table => {
    table.time('checkInTime').notNullable();
    table.time('checkOutTime');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('attendance', table => {
    table.dropColumn('checkInTime');
    table.dropColumn('checkOutTime');
  });

  await knex.schema.alterTable('attendance', table => {
    table.timestamp('checkInTime').notNullable();
    table.timestamp('checkOutTime');
  });
}
