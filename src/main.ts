import { Logger } from '@nestjs/common';
import { ApplicationBuilderV1 } from './appbuilder/v1/ApplicationBuilderV1';

async function bootstrap() {
  const builder = new ApplicationBuilderV1();
  const app = await builder.build();
  new Logger('Encurlta').debug(
    'ENCURLTA API STARTING AT ' +
      new Date() +
      ' - ENV: ' +
      process.env.NODE_ENV,
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
