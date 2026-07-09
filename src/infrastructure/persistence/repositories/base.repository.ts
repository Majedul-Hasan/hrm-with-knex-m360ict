import db from '../knex/knex';

export abstract class BaseRepository<T> {
  constructor(protected readonly table: string) {}

  async findById(id: string) {
    return db('user as u')
      .leftJoin('role as r', 'u.roleId', 'r.id')
      .leftJoin('department as d', 'u.departmentId', 'd.id')
      .leftJoin('designation as des', 'u.designationId', 'des.id')
      .select('u.*', 'r.name as roleName', 'd.name as departmentName', 'des.name as designationName')
      .where('u.id', id)
      .first();
  }

  async findByEmail(email: string) {
    return db('user').where({ email }).first().returning('*');
  }
  async create(payload: Record<string, any>) {
    const [user] = await db('user').insert(payload).returning('*');

    return this.findById(user.id);
  }
  async update(id: string, payload: Record<string, any>) {
    const [user] = await db('user').where({ id }).update(payload).returning('*');

    return user;
  }
  // delete(id: string) { ... }
}
