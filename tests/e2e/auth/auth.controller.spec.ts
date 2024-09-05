import { HttpStatus, INestApplication } from '@nestjs/common';
import { testModuleAppV1 } from '../setup';
import * as request from 'supertest';
import { AuthModule } from '../../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { InboundLoginDto } from '../../../src/auth/dtos/inbound/InboundLoginDto';
import { existsSync, rmSync } from 'fs';
import { OutboundLoginDTO } from '../../../src/auth/dtos/outbound/OutboundLoginDTO';
import { BaseResponseDTO } from '../../../src/common/dto/BaseDTO';

const createInbound = (email: string, password: string) => {
  const inbound = new InboundLoginDto();
  inbound.email = email;
  inbound.password = password;
  return inbound;
};

describe('AuthModule', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await testModuleAppV1({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
        AuthModule,
      ],
    });
  });
  describe('/auth/login', () => {
    it('should register and login', async () => {
      const userData = createInbound('usernormal@gmail.com', 'teste');
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(userData)
        .expect(HttpStatus.CREATED);
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(userData)
        .expect(HttpStatus.OK)
        .expect((response) => {
          const { body } = response;
          expect(body).toBeDefined();
          const parsedBody = body as OutboundLoginDTO;
          expect(parsedBody.status).toBe(HttpStatus.OK);
          expect(parsedBody.token.length).toBeGreaterThan(0);
          expect(parsedBody.message).toBe('User authenticated sucessfully');
        });
    });
    it('should not login, because wrong password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(createInbound('usernormal@gmail.com', 'teste123'))
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((response) => {
          const { body } = response;
          expect(body).toBeDefined();
          const parsedBody = body as BaseResponseDTO;
          expect(parsedBody.status).toBe(HttpStatus.UNAUTHORIZED);
          expect(parsedBody.message).toBe('Unauthorized');
        });
    });
    it('should not login, because wrong data', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(createInbound('', ''))
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((response) => {
          const { body } = response;
          expect(body).toBeDefined();
          const parsedBody = body as BaseResponseDTO;
          expect(parsedBody.status).toBe(HttpStatus.UNAUTHORIZED);
          expect(parsedBody.message).toBe('Unauthorized');
        });
    });
    it('should not login, because wrong email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(createInbound('usenamo@gmail.com', 'teste'))
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((response) => {
          const { body } = response;
          expect(body).toBeDefined();
          const parsedBody = body as BaseResponseDTO;
          expect(parsedBody.status).toBe(HttpStatus.UNAUTHORIZED);
          expect(parsedBody.message).toBe('Unauthorized');
        });
    });
  });
  describe('/auth/register', () => {
    it('should register an user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(createInbound('teste@gmail.com', 'teste'))
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
