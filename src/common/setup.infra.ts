import { INestApplication, ValidationPipe } from '@nestjs/common';
import { InvalidUserData } from '../user/exceptions/InvalidUserData';
import { AppExceptionFilter } from '../infra/filters/AppExceptionFilter';

export function setupPipes(app: INestApplication) {
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

export function setupFilters(app: INestApplication) {
  app.useGlobalFilters(new AppExceptionFilter());
}
