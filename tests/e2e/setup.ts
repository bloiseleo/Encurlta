import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../../src/auth/auth.module';
import { ApplicationBuilderV1 } from '../../src/appbuilder/v1/ApplicationBuilderV1';

export default async function bootstrapTestModule(
  moduleMetadata: ModuleMetadata,
) {
  return Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities: ['./src/**/entities/*.entity.ts'],
        synchronize: true,
      }),
      ...moduleMetadata.imports,
    ],
    exports: moduleMetadata.exports,
    providers: moduleMetadata.providers,
    controllers: moduleMetadata.controllers,
  });
}

export async function testModuleAppV1(moduleMetadata: ModuleMetadata) {
  const testModule = await bootstrapTestModule(moduleMetadata);
  const compiled = await testModule.compile();
  const builder = new ApplicationBuilderV1();
  const app = compiled.createNestApplication();
  builder.setupPipes(app);
  builder.setupFilters(app);
  await app.init();
  return app;
}
