import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env'
          : '.env.development.local',
      isGlobal: true,
    }),
    InfraModule.forRoot(),
    AuthModule,
  ],
})
export class AppModule {}
