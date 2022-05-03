import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): object {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return { message: 'Hello World! from Nest.js', apiKey, dbName };
  }
}
