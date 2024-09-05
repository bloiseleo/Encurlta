import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../common/exceptions/AppException';

export class InvalidUserData extends AppException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
