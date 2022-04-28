import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('DB_CON') private dbCon: Client,
    // @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): object {
    // console.log(this.tasks);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return { message: 'Hello World! from Nest.js', apiKey, dbName };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.dbCon.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
