import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export function getConfig(
  type: 'postgres',
  host: string,
  port: number,
  database: string,
  username: string,
  password: string,
): TypeOrmModuleOptions {
  return {
    type,
    host,
    port,
    database,
    username,
    password,
    synchronize: false,
    migrations: ['dist/migrations/**/*.js'],
    entities: ['dist/**/entities/*.entity.js'],
  };
}
// Credentials for local development, only
const datasource = new DataSource(
  getConfig(
    'postgres',
    'localhost',
    5432,
    'root',
    'root',
    'root',
  ) as DataSourceOptions,
);
export default datasource;
