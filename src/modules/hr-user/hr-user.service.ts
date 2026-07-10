import { PasswordHasher } from '@shared/security/password-hasher.interface';
import { HrUserMapper } from './hr-user.mapper';
import { HrUserRepository } from './hr-user.repository';

import { ConflictError, NotFoundError } from '@shared/errors';
import config from '@shared/config/env.const';
import { IPaginationOptions } from '@shared/helpers/pagination';
import { EmployeeRepository } from '@infra/persistence/repositories/employee.repository';
import db from '@infra/persistence/knex/knex';
import { CreateEmployeeDto } from './hr-user.validation';
import { StorageService } from '@infra/storage/storage.service';
import fs from 'fs/promises';
import path from 'path';

export class HrUserService {
  constructor(
    private readonly hrUserRepository: HrUserRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async create(payload: CreateEmployeeDto & { file?: Express.Multer.File }, origin?: string) {
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

    if (payload.file) {
      // let image: { url: string; key: string } = await StorageService.uploadFromPath(payload.file.path, 'public'); // method for AWS S3
      // payload.profileImage = image.url;
      payload.profileImage = `${origin}/uploads/${payload.file.filename}`;
    }

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

  async update(id: string, payload: any, origin?: string) {
    const employee = await this.employeeRepository.findById(Number(id));

    if (!employee) {
      throw new NotFoundError('Employee not found.');
    }

    const hrUser = await this.hrUserRepository.findById(Number(employee.hrUserId));

    if (!hrUser) {
      throw new NotFoundError('HR User not found.');
    }

    // Email uniqueness check
    if (payload.email && payload.email !== hrUser.email) {
      const emailExists = await this.hrUserRepository.existsByEmail(payload.email);

      if (emailExists) {
        throw new ConflictError('Email already exists.');
      }
    }

    // ============================
    // Profile Image
    // ============================
    if (payload.file) {
      if (employee.profileImage) {
        try {
          const oldFilename = path.basename(employee.profileImage);

          await fs.unlink(path.join(process.cwd(), 'public', 'uploads', oldFilename));
        } catch (error: any) {
          if (error.code !== 'ENOENT') {
            console.error('Failed to delete old profile image:', error);
          }
        }
      }

      payload.profileImage = `${origin}/uploads/${payload.file.filename}`;
    }

    delete payload.file;

    // ============================
    // HR User Payload
    // ============================
    const hrUserPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      status: payload.status,
    };

    // Remove undefined values
    Object.keys(hrUserPayload).forEach(key => {
      if (hrUserPayload[key as keyof typeof hrUserPayload] === undefined) {
        delete hrUserPayload[key as keyof typeof hrUserPayload];
      }
    });

    // ============================
    // Employee Payload
    // ============================
    const employeePayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,

      street: payload.street,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      country: payload.country,

      dateOfBirth: payload.dateOfBirth,
      joinDate: payload.joinDate,
      leaveDate: payload.leaveDate,

      salary: payload.salary,
      bloodGroup: payload.bloodGroup,
      profileImage: payload.profileImage,

      employmentStatusId: payload.employmentStatusId,
      departmentId: payload.departmentId,
      designationId: payload.designationId,
      weeklyHolidayId: payload.weeklyHolidayId,

      status: payload.status,
    };

    // Remove undefined values
    Object.keys(employeePayload).forEach(key => {
      if (employeePayload[key as keyof typeof employeePayload] === undefined) {
        delete employeePayload[key as keyof typeof employeePayload];
      }
    });

    // ============================
    // Transaction
    // ============================
    const result = await db.transaction(async trx => {
      const updatedHrUser = await this.hrUserRepository.update(Number(hrUser.id), hrUserPayload, trx);

      const updatedEmployee = await this.employeeRepository.update(Number(id), employeePayload, trx);

      return {
        ...updatedEmployee,
        hrUser: updatedHrUser,
      };
    });

    return HrUserMapper.toResponse(result);
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
