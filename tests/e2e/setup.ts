import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
