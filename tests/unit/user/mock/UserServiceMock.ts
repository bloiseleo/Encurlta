import UserService from '../../../../src/user/services/UserService';

export const UserServiceMock = {
  createUser: jest.fn(),
  findByEmail: jest.fn(),
} as unknown as jest.Mocked<UserService>;
