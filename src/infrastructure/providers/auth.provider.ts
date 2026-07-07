// infrastructure/container/auth.container.ts

import { NodemailerEmailProvider } from '@infra/email/nodemailer/nodemailer-email.provider';

// import { AuthenticationService } from '@modules/auth/application/services/authentication.service';

import config from '@shared/config/env.const';
import { JwtTokenProvider } from '@shared/security/interfaces/jwt.provider';

/**
 * providers
 */
let userRepo: any; //TODO
class AuthenticationService {
  constructor(
    public userRepository: any,
    public jwtToken: JwtTokenProvider
  ) {}
}

export const tokenProvider = new JwtTokenProvider(config.jwt.jwt_secret, config.jwt.access_expires_in);

export const emailProvider = new NodemailerEmailProvider();

/**
 * Service
 */

export const authenticationService = new AuthenticationService(userRepo, tokenProvider);
