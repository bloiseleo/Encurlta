import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import UserService from './UserService';
import { Repository } from 'typeorm';
import EmailAlreadyTaken from '../exceptions/EmailAlreadyTaken';
import { Injectable } from "@nestjs/common";
import { InvalidUserData } from "../exceptions/InvalidUserData";

@Injectable()
export default class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    if (
      await this.userRepository.existsBy({
        email: user.email,
      })
    ) {
      throw new EmailAlreadyTaken(user);
    }
    if(user.password.length < 3) {
      throw new InvalidUserData(`User password must have, at least, 3 characters.`);
    }
    return await this.userRepository.save(user);
  }
}
