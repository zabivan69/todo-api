import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';

import { config } from './app.config';

const { DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = config;

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Task],
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default OrmConfig;
