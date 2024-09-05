import { hashSync } from 'bcrypt';
import { User } from '../../../src/user/entities/user.entity';
import UserService from '../../../src/user/services/UserService';
import UserServiceImpl from '../../../src/user/services/UserServiceImpl';
import userRepositoryMock from './mock/UserRepositoryMock';
import EmailAlreadyTaken from '../../../src/user/exceptions/EmailAlreadyTaken';
import { InvalidUserData } from '../../../src/user/exceptions/InvalidUserData';

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
    it('should throw an exception when the password has less than 3 characters', async () => {
      const user = User.builderNew('teste@gmail.com', 'aa');
      try {
        await userService.createUser(user);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(InvalidUserData);
      }
    });
    it('should throw an exception when the email is already in use', async () => {
      const user = User.builderNew('teste@gmail.com', 'encrypted');
      userRepositoryMock.existsBy.mockResolvedValue(true);
      try {
        await userService.createUser(user);
      } catch (e: unknown) {
        expect(e).toBeInstanceOf(EmailAlreadyTaken);
      }
    });
  });
});
