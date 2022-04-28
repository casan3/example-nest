import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// postgres config for typeorm migrations
/*const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(<string>process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['../dist/database/migrations.js'],
  cli: { migrationsDir: './database/migrations' },
}; */

// mysql config for typeorm migrations
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(<string>process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
  cli: { migrationsDir: 'src/database/migrations' },
};

export default config;
