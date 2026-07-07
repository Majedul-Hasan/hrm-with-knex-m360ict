import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import { extractBearerToken } from '@shared/security/extractBearerToken';

import AppError from '@shared/errors/base/AppError';

import { verifyAccessToken } from '@shared/security/interfaces/jwt.provider';
import config from '@shared/config/env.const';
import { VerificationCodeType } from '@shared/user.constant';
import { UserModel } from '@infra/persistence/mongoose/models/user.model';

interface ResetTokenPayload {
  userId: string;
  purpose: VerificationCodeType;
  type: VerificationCodeType;
}

// export default resetVerifyToken;
const verifyVerificationToken =
  (...allowedTypes: VerificationCodeType[]) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      const token = extractBearerToken(authHeader);

      const decoded: ResetTokenPayload = verifyAccessToken(token, config.jwt.jwt_secret);
      const por = decoded.type ?? decoded?.purpose;
      if (!por) {
        throw new AppError(httpStatus.FORBIDDEN, 'Token not valid for this operation');
      }
      if (allowedTypes.length && !allowedTypes.includes(por)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Token not valid for this operation');
      }

      const user = await UserModel.findById({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
      }
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

export default verifyVerificationToken;
