/*
import crypto from 'crypto';

export class AuthUtils {
  static generateResetToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
  static hashResetToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
  static getResetTokenExpiry(minutes = 15): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}
*/

import crypto from 'crypto';

export class AuthUtils {
  static generateResetToken(length = 6): string {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    return crypto.randomInt(min, max + 1).toString();
  }

  static hashResetToken(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  static getResetTokenExpiry(minutes = 15): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}
