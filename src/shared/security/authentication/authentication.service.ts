import { ITokenProvider, TokenPayload } from '@shared/security/interfaces/token-provider.interface';
import { ForbiddenError, UnauthorizedError } from '@shared/errors';
import { AuthRepository } from '@modules/auth/auth.repository';
import { JwtPayload } from '@shared/types/auth.types';

export class AuthenticationService {
  constructor(
    private readonly userRepository: AuthRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async authenticate(accessToken: string): Promise<JwtPayload> {
    const payload = this.tokenProvider.verifyAccessToken<TokenPayload>(accessToken);
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    if (user.isBlocked) {
      throw new ForbiddenError('Account is blocked');
    }
    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      roleId: user.roleId,
      roleName: user.roleName,
    };
  }
}
