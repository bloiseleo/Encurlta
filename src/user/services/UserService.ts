import { User } from '../entities/user.entity';

export default interface UserService {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
