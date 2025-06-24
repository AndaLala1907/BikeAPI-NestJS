import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// Basic controller for the root route
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Returns static welcome message
  @Get()
  getHello(): string {
    return 'BikeAPI is live!';
  }
}
