import { ApplicationBuilder } from '../app.builder';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { InvalidUserData } from '../../common/exceptions/InvalidUserData';
import { AppExceptionFilter } from '../../infra/filters/AppExceptionFilter';
import { UnauthorizedFilter } from '../../infra/filters/UnauthorizedFilter';

export class ApplicationBuilderV1 extends ApplicationBuilder {
  setupFilters(app: INestApplication) {
    app.useGlobalFilters(new AppExceptionFilter(), new UnauthorizedFilter());
  }
  setupPipes(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          const error = errors[0];
          const { constraints } = error;
          if (!constraints) {
            return;
          }
          const message = constraints[Object.keys(constraints)[0]];
          throw new InvalidUserData(message);
        },
      }),
    );
  }
  async build(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    this.setupPipes(app);
    this.setupFilters(app);
    app.setGlobalPrefix('api');
    app.enableCors({
      methods: '*',
      origin: ['http://localhost:3001'],
    });
    return app;
  }
}
