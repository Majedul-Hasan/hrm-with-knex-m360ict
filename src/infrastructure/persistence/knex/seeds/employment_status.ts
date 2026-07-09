import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('employment_status').del();

  await knex('employment_status').insert([
    {
      name: 'Permanent',
      colourValue: '#22C55E',
      description: 'Full-time permanent employee',
      status: true,
    },
    {
      name: 'Probation',
      colourValue: '#F59E0B',
      description: 'Employee is currently under probation period',
      status: true,
    },
    {
      name: 'Contract',
      colourValue: '#3B82F6',
      description: 'Employee hired for a fixed-term contract',
      status: true,
    },
    {
      name: 'Intern',
      colourValue: '#8B5CF6',
      description: 'Internship employee',
      status: true,
    },
    {
      name: 'Part-Time',
      colourValue: '#06B6D4',
      description: 'Part-time employee',
      status: true,
    },
    {
      name: 'Temporary',
      colourValue: '#F97316',
      description: 'Temporary employee',
      status: true,
    },
    {
      name: 'Freelancer',
      colourValue: '#EC4899',
      description: 'External freelancer or consultant',
      status: true,
    },
    {
      name: 'Resigned',
      colourValue: '#6B7280',
      description: 'Employee resigned from the organization',
      status: true,
    },
    {
      name: 'Terminated',
      colourValue: '#EF4444',
      description: 'Employment terminated by the organization',
      status: true,
    },
    {
      name: 'Retired',
      colourValue: '#14B8A6',
      description: 'Employee retired from service',
      status: true,
    },
  ]);
}
