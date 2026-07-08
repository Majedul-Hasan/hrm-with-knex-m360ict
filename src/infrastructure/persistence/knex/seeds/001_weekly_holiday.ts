import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const weekly_holidays = [
    {
      name: 'Friday-Saturday',
      startDay: 'FRIDAY',
      endDay: 'SATURDAY',
      // created_at: new Date(),
      // updated_at: new Date(),
    },
    {
      name: 'Saturday-Sunday',
      startDay: 'SATURDAY',
      endDay: 'SUNDAY',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Sunday',
      startDay: 'SUNDAY',
      endDay: 'SUNDAY',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  for (const days of weekly_holidays) {
    const exists = await knex('weekly_holiday').where({ name: days.name }).first();

    if (!exists) {
      await knex('weekly_holiday').insert(days);
    }
  }
}
