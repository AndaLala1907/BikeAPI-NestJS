import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
// Application bootstrap function
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS and global validation
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // Initialize Swagger docs
  setupSwagger(app);
  // Start server on port
  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
