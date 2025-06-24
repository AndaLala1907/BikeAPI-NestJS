import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
// swagger setup for API documentation
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('BikeAPI')
    .setDescription('API for bike tracking, journeys, and devices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); //serve docs at /api-docs
}
