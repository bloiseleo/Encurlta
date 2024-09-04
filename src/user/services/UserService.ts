import { User } from '../entities/user.entity';

export default interface UserService {
  createUser(user: User): Promise<User>;
}
