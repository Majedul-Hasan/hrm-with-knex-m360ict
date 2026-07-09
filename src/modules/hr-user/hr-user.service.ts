import { PasswordHasher } from '@shared/security/password-hasher.interface';
import { HrUserMapper } from './hr-user.mapper';
import { HrUserRepository } from './hr-user.repository';

import { ConflictError, NotFoundError } from '@shared/errors';
import config from '@shared/config/env.const';
import { IPaginationOptions } from '@shared/helpers/pagination';

export class HrUserService {
  constructor(
    private readonly repository: HrUserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async create(payload: any) {
    const existsByEmail = await this.repository.existsByEmail(payload.email);
    console.log({ existsByEmail });

    if (existsByEmail) {
      throw new ConflictError('Employee with this email already exists.');
    }

    const existsByEmployeeId = await this.repository.existsByEmployeeId(payload.employeeId);
    console.log({ existsByEmployeeId });

    if (existsByEmployeeId) {
      throw new ConflictError('Employee ID already exists.');
    }

    const { password, ...inputData } = payload;
    const userName = payload.userName ?? payload.employeeId + payload.firstName;

    const passwordHash = await this.passwordHasher.hash(config.default_password);

    const user = await this.repository.create({ ...inputData, passwordHash, userName });

    return HrUserMapper.toResponse(user);
  }

  async getById(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return HrUserMapper.toDetails(user);
  }

  async list(
    query: IPaginationOptions & {
      search?: string;
    }
  ) {
    const { meta, data } = await this.repository.list(query);

    return {
      meta,
      data: HrUserMapper.toList(data),
    };
  }

  async update(id: string, payload: any) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (payload.email && payload.email !== user.email) {
      const exists = await this.repository.existsByEmail(payload.email);

      if (exists) {
        throw new ConflictError('Email already exists.');
      }
    }

    const updatedUser = await this.repository.update(id, payload);

    return HrUserMapper.toResponse(updatedUser);
  }

  async delete(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    await this.repository.softDelete(id);
  }

  async changeStatus(id: string, status: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const updatedUser = await this.repository.changeStatus(id, status);

    return HrUserMapper.toResponse(updatedUser);
  }

  async assignRole(id: string, roleId: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const updatedUser = await this.repository.assignRole(id, roleId);

    return HrUserMapper.toResponse(updatedUser);
  }

  async me(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return HrUserMapper.toProfile(user);
  }
}
