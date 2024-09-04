import { hashSync } from 'bcrypt';
import { User } from '../../../src/user/entities/user.entity';
import UserService from '../../../src/user/services/UserService';
import UserServiceImpl from '../../../src/user/services/UserServiceImpl';
import userRepositoryMock from './mock/UserRepositoryMock';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserServiceImpl(userRepositoryMock);
  });

  describe('createUser', () => {
    it('should create an user successfully', async () => {
      const user = new User();
      user.email = 'teste@gmail.com';
      user.password = 'encrypted';

      userRepositoryMock.save.mockResolvedValue(
        User.builder(1, user.email, hashSync(user.password, 10)),
      );
      userRepositoryMock.existsBy.mockResolvedValue(false);

      const result = await userService.createUser(user);

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeGreaterThan(0);
      expect(result.email).toStrictEqual(user.email);
      expect(result.password).not.toEqual(user.password);
      expect(result.password.length).toBeGreaterThan(0);
    });
  });
});
