import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('designation').del();

  // Inserts seed entries
  await knex('designation').insert([
    { id: 1, name: 'Chief Executive Officer (CEO)' },
    { id: 2, name: 'Chief Technology Officer (CTO)' },
    { id: 3, name: 'Chief Operating Officer (COO)' },

    { id: 4, name: 'General Manager' },
    { id: 5, name: 'Department Manager' },
    { id: 6, name: 'Team Lead' },

    { id: 7, name: 'Senior Software Engineer' },
    { id: 8, name: 'Software Engineer' },
    { id: 9, name: 'Junior Software Engineer' },
    { id: 10, name: 'Intern Software Engineer' },

    { id: 11, name: 'Senior QA Engineer' },
    { id: 12, name: 'QA Engineer' },

    { id: 13, name: 'DevOps Engineer' },
    { id: 14, name: 'System Administrator' },

    { id: 15, name: 'UI/UX Designer' },
    { id: 16, name: 'Graphic Designer' },

    { id: 17, name: 'Product Manager' },
    { id: 18, name: 'Project Manager' },
    { id: 19, name: 'Business Analyst' },

    { id: 20, name: 'HR Manager' },
    { id: 21, name: 'HR Executive' },
    { id: 22, name: 'Recruitment Executive' },

    { id: 23, name: 'Account Manager' },
    { id: 24, name: 'Accountant' },

    { id: 25, name: 'Sales Manager' },
    { id: 26, name: 'Sales Executive' },

    { id: 27, name: 'Marketing Manager' },
    { id: 28, name: 'Marketing Executive' },

    { id: 29, name: 'Customer Support Executive' },

    { id: 30, name: 'Office Assistant' },
  ]);
}
