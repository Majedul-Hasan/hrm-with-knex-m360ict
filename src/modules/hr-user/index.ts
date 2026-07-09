import { HrUserController } from './hr-user.controller';
import { HrUserRepository } from './hr-user.repository';
import { HrUserService } from './hr-user.service';
import { createHrUserRoutes } from './hr-user.routes';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';
import config from '@shared/config/env.const';

const repository = new HrUserRepository();
const hasher = new BcryptPasswordHasher(config.bcrypt_salt_rounds);

const service = new HrUserService(repository, hasher);

const controller = new HrUserController(service);

export const hrUserRoutes = createHrUserRoutes(controller);

export default controller;
