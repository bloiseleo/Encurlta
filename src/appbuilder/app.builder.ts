import { INestApplication, Logger } from '@nestjs/common';

export abstract class ApplicationBuilder {
  private _logger: Logger = new Logger('ApplicationBuilder');
  abstract build(): Promise<INestApplication>;
  abstract setupPipes(app: INestApplication);
  abstract setupFilters(app: INestApplication);
}
