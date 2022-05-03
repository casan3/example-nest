import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint() {
    return "I'm new";
  }

  @Get('/route/')
  anotherEndPoint() {
    return 'with slash';
  }
}
