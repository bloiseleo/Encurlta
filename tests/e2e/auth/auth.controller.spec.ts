import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import bootstrapTestModule from '../setup';
import * as request from 'supertest';
import { AuthModule } from '../../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { InboundLoginDto } from '../../../src/auth/dtos/inbound/InboundLoginDto';
import { setupFilters, setupPipes } from '../../../src/common/setup.infra';
import { existsSync, rmSync } from 'fs';

const createInbound = (email: string, password: string) => {
  const inbound = new InboundLoginDto();
  inbound.email = email;
  inbound.password = password;
  return inbound;
};

describe('AuthModule', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const testModule = await bootstrapTestModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
        AuthModule,
      ],
    });
    const compiled = await testModule.compile();
    app = compiled.createNestApplication();
    setupPipes(app);
    setupFilters(app);
    await app.init();
  });
  describe('/auth/register', () => {
    it('should register an user', () => {
      const inbound = new InboundLoginDto();
      inbound.password = 'teste';
      inbound.email = 'teste@gmail.com';
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(inbound)
        .expect(HttpStatus.CREATED);
    });
    it('should not register an user, because the email was already taken', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(createInbound('teste@gmail.com', 'teste'))
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          const { body } = res;
          expect(body).toBeDefined();
          expect(body.message).toBe(
            'User with email teste@gmail.com already exists',
          );
        });
    });
    it('should not register an user, because the email is invalid', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(createInbound('teste123', 'teste'))
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          const { body } = res;
          expect(body).toBeDefined();
          expect(body.message).toBe('Invalid email address');
          expect(body.status).toBe(HttpStatus.BAD_REQUEST);
        });
    });
    it('should not register user, because the password length is not enough', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(createInbound('teste@gmail.com', 'aa'))
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          const { body } = res;
          expect(body).toBeDefined();
          expect(body.message).toBe('Password must have at least 3 characters');
          expect(body.status).toBe(HttpStatus.BAD_REQUEST);
        });
    });
  });
  afterAll(async () => {
    await app.close();
    if (existsSync('./db')) rmSync('./db');
  });
});
