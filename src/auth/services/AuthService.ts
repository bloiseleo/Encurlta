import { User } from '../../user/entities/user.entity';

export default interface AuthService {
  login(email: string, password: string): Promise<string>;
  register(email: string, password: string): Promise<User>;
}
