import UserServiceImpl from '../../../../src/user/services/UserServiceImpl';

export const UserServiceMock = {
  createUser: jest.fn(),
  findByEmail: jest.fn(),
} as unknown as jest.Mocked<UserServiceImpl>;
