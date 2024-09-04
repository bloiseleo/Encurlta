import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

const userRepositoryMock = {
  save: jest.fn(),
  existsBy: jest.fn(),
} as unknown as jest.Mocked<Repository<User>>;

export default userRepositoryMock;
