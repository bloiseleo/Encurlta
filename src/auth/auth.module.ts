import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import AuthController from './controllers/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthServiceImpl } from './services/AuthServiceImpl';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') ?? 'secret',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
