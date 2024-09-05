import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  new Logger('Encurlta').debug(
    'ENCURLTA API STARTING AT ' +
      new Date() +
      ' - ENV: ' +
      process.env.NODE_ENV,
  );
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
