import AuthService from '../../../src/auth/services/AuthService';
import { AuthServiceImpl } from '../../../src/auth/services/AuthServiceImpl';
import { UserServiceMock } from '../user/mock/UserServiceMock';
import { JwtServicMock } from './mock/JwtServicMock';
import { User } from '../../../src/user/entities/user.entity';
import { hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  beforeAll(() => {
    service = new AuthServiceImpl(UserServiceMock, JwtServicMock);
  });
  describe('login', () => {
    it('should login and generate JWT token', async () => {
      const user = User.builder(1, 'teste@gmail.com', hashSync('teste', 10));
      UserServiceMock.findByEmail.mockResolvedValue(user);
      const token = await service.login('teste@gmail.com', 'teste');
      expect(token).toBeDefined();
      expect(token.length).toBeGreaterThan(0);
    });
    it('should not login, because user does not exists', async () => {
      UserServiceMock.findByEmail.mockResolvedValue(null);
      try {
        await service.login('teste@gmail.com', 'teste');
      } catch (e: unknown) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should not login, because wrong password provided', async () => {
      UserServiceMock.findByEmail.mockResolvedValue(
        User.builder(1, 'teste@gmail.com', 'teste123'),
      );
      try {
        await service.login('teste@gmail.com', 'teste');
      } catch (e: unknown) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
