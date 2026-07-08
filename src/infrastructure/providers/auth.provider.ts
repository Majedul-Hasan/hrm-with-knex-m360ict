import { NodemailerEmailProvider } from '@infra/email/nodemailer/nodemailer-email.provider';
import { AuthRepository } from '@modules/auth/auth.repository';
import config from '@shared/config/env.const';
import { AuthenticationService } from '@shared/security/authentication/authentication.service';
import { JwtTokenProvider } from '@shared/security/interfaces/jwt.provider';

export const tokenProvider = new JwtTokenProvider(config.jwt.jwt_secret, config.jwt.access_expires_in);

export const emailProvider = new NodemailerEmailProvider();
const userRepo = new AuthRepository();
/**
 * Service
 */

export const authenticationService = new AuthenticationService(userRepo, tokenProvider);
