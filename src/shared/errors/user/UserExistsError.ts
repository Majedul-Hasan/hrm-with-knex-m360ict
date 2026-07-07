import status from 'http-status';
import AppError from '../base/AppError';

export class UserExistsError extends AppError {
  constructor(message = 'User already exists') {
    super(status.CONFLICT, message);
  }
}
export class PhoneExistsError extends AppError {
  constructor(message = "'Phone number already exists'") {
    super(status.CONFLICT, message);
  }
}
