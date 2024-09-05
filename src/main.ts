import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupFilters, setupPipes } from './common/setup.infra';

async function bootstrap() {
  new Logger('Encurlta').debug(
    'ENCURLTA API STARTING AT ' +
      new Date() +
      ' - ENV: ' +
      process.env.NODE_ENV,
  );
  const app = await NestFactory.create(AppModule);
  setupPipes(app);
  setupFilters(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
