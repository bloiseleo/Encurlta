import AuthService from './AuthService';
import { User } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import UserServiceImpl from '../../user/services/UserServiceImpl';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private userService: UserServiceImpl,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: '1 day',
      },
    );
  }
  async register(email: string, password: string): Promise<User> {
    return await this.userService.createUser(User.builderNew(email, password));
  }
}
