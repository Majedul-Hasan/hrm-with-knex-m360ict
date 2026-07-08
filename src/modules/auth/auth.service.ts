import { PasswordHasher } from '@shared/security/password-hasher.interface';
import { AuthRepository } from './auth.repository';
import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';
import {
  AuthUser,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  LoginResponse,
  ResetPasswordDto,
} from './auth.types';
import {
  BadRequestError,
  InvalidCredentialsError,
  InvalidTokenError,
  NotFoundError,
  TokenExpiredError,
  UserNotFoundError,
} from '@shared/errors';
import config from '@shared/config/env.const';
import { AuthMapper } from './auth.mapper';
import { otpQueueEmail } from '@infra/bullMQ/queues/mailQueues';
import { AuthUtils } from './auth.utils';

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenProvider: ITokenProvider
  ) {}

  public async login(payload: LoginDto): Promise<LoginResponse> {
    const user = await this.authRepository.findByLogin(payload.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.status) {
      throw new InvalidCredentialsError('Your account has been disabled.');
    }

    const isPasswordMatched = await this.passwordHasher.compare(payload.password, user.passwordHash);

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError();
    }

    const accessToken = this.tokenProvider.generateAccessToken(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
        roleId: user.roleId,
      },
      {
        expiresIn: config.jwt.access_expires_in,
      }
    );

    return AuthMapper.toLoginResponse(user, accessToken, config.jwt.access_expires_in);
  }

  public async forgotPassword(payload: ForgotPasswordDto): Promise<void> {
    const user = await this.authRepository.findByEmail(payload.email);

    // Don't reveal whether the email exists
    if (!user) {
      throw new UserNotFoundError();
    }
    const resetToken = AuthUtils.generateResetToken();
    const hashedToken = AuthUtils.hashResetToken(resetToken);
    const expiresAt = AuthUtils.getResetTokenExpiry(15);
    await this.authRepository.saveResetToken(user.id, hashedToken, expiresAt);

    await otpQueueEmail.add(
      'passwordResetRequest',
      {
        name: 'passwordResetRequest',
        userName: user.userName,
        email: user.email,
        subject: 'Reset your password',
        otpCode: resetToken,
      },
      {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: 20,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      }
    );
  }

  public async resetPassword(payload: ResetPasswordDto): Promise<void> {
    if (payload.password !== payload.confirmPassword) {
      throw new BadRequestError('Password and confirm password do not match.');
    }

    const hashedToken = AuthUtils.hashResetToken(payload.token);

    const user = await this.authRepository.findByResetToken(hashedToken);

    if (!user) {
      throw new InvalidTokenError('Invalid password reset token.');
    }

    if (!user.resetPasswordTokenExpiresAt || new Date(user.resetPasswordTokenExpiresAt) < new Date()) {
      throw new TokenExpiredError('Password reset token has expired.');
    }

    const passwordHash = await this.passwordHasher.hash(payload.password);

    await this.authRepository.updatePassword(user.id, passwordHash);

    await this.authRepository.clearResetToken(user.id);
  }

  public async changePassword(userId: number, payload: ChangePasswordDto): Promise<void> {
    if (payload.newPassword !== payload.confirmPassword) {
      throw new BadRequestError('Password and confirm password do not match.');
    }

    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const isMatched = await this.passwordHasher.compare(payload.oldPassword, user.passwordHash);

    if (!isMatched) {
      throw new InvalidCredentialsError('Old password is incorrect.');
    }

    const passwordHash = await this.passwordHasher.hash(payload.newPassword);

    await this.authRepository.updatePassword(user.id, passwordHash);
  }

  public async me(userId: number): Promise<AuthUser> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return AuthMapper.toAuthUser(user);
  }
}
