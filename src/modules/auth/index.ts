import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';
import { AuthRepository } from './auth.repository';
import { JwtTokenProvider } from '@shared/security/interfaces/jwt.provider';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import config from '@shared/config/env.const';
import { createAuthRoutes } from './auth.routes';

const repository = new AuthRepository();

const hasher = new BcryptPasswordHasher(config.bcrypt_salt_rounds);

const tokenProvider = new JwtTokenProvider(config.jwt.jwt_secret, config.jwt.refresh_token_secret);

const service = new AuthService(repository, hasher, tokenProvider);

const controller = new AuthController(service);

export const authRoutes = createAuthRoutes(controller);

export default controller;
