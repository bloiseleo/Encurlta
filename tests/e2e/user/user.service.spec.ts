import { INestApplication } from '@nestjs/common';
import bootstrapTestModule from '../setup';
import { UserModule } from '../../../src/user/user.module';
import UserServiceImpl from '../../../src/user/services/UserServiceImpl';
import { User } from '../../../src/user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { rmSync, existsSync } from 'fs';

describe('User', () => {
  let app: INestApplication;
  beforeAll(async () => {
    if (existsSync('./db')) {
      rmSync('./db');
    }
    const moduleRef = await bootstrapTestModule({
      imports: [UserModule],
    });
    const compiledModuleRef = await moduleRef.compile();
    app = compiledModuleRef.createNestApplication();
    await app.init();
  });
  describe('UserService', () => {
    it('should contain an UserService', async () => {
      const userService = app.get(UserServiceImpl);
      expect(userService).toBeDefined();
    });
    it('should encrypt the user password before saving it into the database', async () => {
      const userService = app.get(UserServiceImpl);
      const user = await userService.createUser(
        User.builderNew('teste@teste.com', 'teste123'),
      );
      expect(user).toBeDefined();
      expect(user.email).toEqual('teste@teste.com');
      expect(user.password).not.toEqual('teste123');
      expect(user.password.length).toBeGreaterThan(0);
      expect(compareSync('teste123', user.password)).toBeTruthy();
    });
  });
  afterAll(async () => {
    await app.close();
    if (existsSync('./db')) {
      rmSync('./db');
    }
  });
});
