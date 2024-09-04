import { User } from '../entities/user.entity';

export default class EmailAlreadyTaken extends Error {
  constructor(user: User) {
    super(`User with email ${user.email} already exists`);
  }
}
