import { AppException } from '../../common/exceptions/AppException';
import { User } from '../entities/user.entity';
import { HttpStatus } from '@nestjs/common';

export default class EmailAlreadyTaken extends AppException {
  constructor(user: User) {
    super(
      `User with email ${user.email} already exists`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
