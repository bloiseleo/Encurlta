import { INestApplication, ValidationPipe } from '@nestjs/common';
import bootstrapTestModule from '../setup';
import * as request from 'supertest';
import { UserModule } from '../../../src/user/user.module';
import { AuthModule } from '../../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { InboundLoginDto } from '../../../src/auth/dtos/inbound/InboundLoginDto';
import AuthController from '../../../src/auth/controllers/AuthController';

describe('AuthModule', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const testModule = await bootstrapTestModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
        UserModule,
        AuthModule,
      ],
    });
    const compiled = await testModule.compile();
    app = compiled.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
  });
  describe('/auth/register', () => {
    it('should register an user', () => {
      const inbound = new InboundLoginDto();
      inbound.password = 'teste';
      inbound.email = 'teste@gmail.com';
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(inbound)
        .expect(201);
    });
  });
});
