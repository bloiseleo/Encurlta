import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

@Module({})
/**
 * It contains all the configuration needed to provide a valid database connection or ORM
 */
export class InfraModule {
  static forRoot(): DynamicModule {
    return {
      module: InfraModule,
      imports: [
        ServeStaticModule.forRoot({
          rootPath: path.join(__dirname, '..', '..', 'client.app'),
          exclude: ['/api/(.*)'],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            getConfig(
              'postgres',
              configService.get('DATABASE_HOST'),
              configService.get('DATABASE_PORT'),
              configService.get('DATABASE_DB'),
              configService.get('DATABASE_USER'),
              configService.get('DATABASE_PASSWORD'),
            ),
        }),
      ],
    };
  }
}
