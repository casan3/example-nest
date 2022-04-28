import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

const API_KEY = '1234565';
const API_KEY_PROD = 'PROD1234565';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configSevice: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configSevice.mysql;
        return {
          // type: 'postgres',
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'DB_CON',
      useFactory: (configSevice: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configSevice.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port: port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'DB_CON', TypeOrmModule],
})
export class DatabaseModule {}
