import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import UserService from './UserService';
import { Repository } from 'typeorm';
import EmailAlreadyTaken from '../exceptions/EmailAlreadyTaken';

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
    return await this.userRepository.save(user);
  }
}
