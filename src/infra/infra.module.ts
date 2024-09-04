import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './database.config';

@Module({})
/**
 * It contains all the configuration needed to provide a valid database connection or ORM
 */
export class InfraModule {
  static forRoot(): DynamicModule {
    return {
      module: InfraModule,
      imports: [
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
