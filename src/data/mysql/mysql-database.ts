import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class MySQLDatabase {
  static CreateDataSource() {
    const ormConfig: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/*.entity.js'],
      migrations: ['./src/dist/db/'],
      synchronize: false,
      logging: false,
      ssl: false,
    };

    return ormConfig;
  }
}

import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/data/mysql/models/*.entity.ts'],
  migrations: ['src/data/mysql/migrations/*.ts'],
  synchronize: false,
  logging: false,
  ssl: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
