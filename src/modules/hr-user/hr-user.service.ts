import { PasswordHasher } from '@shared/security/password-hasher.interface';
import { HrUserMapper } from './hr-user.mapper';
import { HrUserRepository } from './hr-user.repository';

import { ConflictError, NotFoundError } from '@shared/errors';
import config from '@shared/config/env.const';
import { IPaginationOptions } from '@shared/helpers/pagination';
import { EmployeeRepository } from '@infra/persistence/repositories/employee.repository';
import db from '@infra/persistence/knex/knex';
import { CreateEmployeeDto } from './hr-user.validation';

export class HrUserService {
  constructor(
    private readonly hrUserRepository: HrUserRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async create(payload: CreateEmployeeDto) {
    const emailExists = await this.hrUserRepository.existsByEmail(payload.email);

    if (emailExists) {
      throw new ConflictError('Employee with this email already exists.');
    }

    const employeeIdExists = await this.employeeRepository.existsByEmployeeId(payload.employeeId);

    if (employeeIdExists) {
      throw new ConflictError('Employee ID already exists.');
    }

    const passwordHash = await this.passwordHasher.hash(config.default_password);

    const userName = payload.userName ?? `${payload.employeeId}${payload.firstName}`.toLowerCase();

    const employee = await db.transaction(async trx => {
      const hrUser = await this.hrUserRepository.create(
        {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          userName,
          passwordHash,
          roleId: payload.roleId.toString(),
          status: true,
        },
        trx
      );

      const employee = await this.employeeRepository.create(
        {
          employeeId: payload.employeeId,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          street: payload.street,
          city: payload.city,
          state: payload.state,
          zipCode: payload.zipCode,
          country: payload.country,
          salary: payload.salary ? payload.salary.toString() : undefined,
          bloodGroup: payload.bloodGroup,
          profileImage: payload.profileImage,
          dateOfBirth: payload.dateOfBirth,
          joinDate: payload.joinDate ?? new Date(),
          employmentStatusId: payload.employmentStatusId,
          departmentId: payload.departmentId,
          designationId: payload.designationId,
          weeklyHolidayId: payload.weeklyHolidayId,
          status: true,
          hrUserId: Number(hrUser.id),
        },
        trx
      );

      return { ...employee, ...hrUser };
    });

    return HrUserMapper.toResponse(employee);
  }

  async getById(id: string) {
    const user = await this.employeeRepository.findById(Number(id));

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
    const { meta, data } = await this.hrUserRepository.list(query);

    return {
      meta,
      data: HrUserMapper.toList(data),
    };
  }

  async update(id: string, payload: any) {
    const user = await this.hrUserRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (payload.email && payload.email !== user.email) {
      const exists = await this.hrUserRepository.existsByEmail(payload.email);

      if (exists) {
        throw new ConflictError('Email already exists.');
      }
    }

    const updatedUser = await this.hrUserRepository.update(Number(id), payload);

    return HrUserMapper.toResponse(updatedUser);
  }

  async delete(id: string) {
    const user = await this.hrUserRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    await this.hrUserRepository.softDelete(Number(id));
  }

  async changeStatus(id: string, status: string) {
    const user = await this.hrUserRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const updatedUser = await this.hrUserRepository.changeStatus(Number(id), status === 'true');

    return HrUserMapper.toResponse(updatedUser);
  }

  async assignRole(id: string, roleId: string) {
    const user = await this.hrUserRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const updatedUser = await this.hrUserRepository.assignRole(id, roleId);

    return HrUserMapper.toResponse(updatedUser);
  }

  async me(userId: string) {
    const user = await this.hrUserRepository.findById(Number(userId));

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return HrUserMapper.toProfile(user);
  }
}
