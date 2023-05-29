import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Load environment variables from .env file
  config();

  /*
   * 'config' const name refactored to 'docConfig', so that there is conflict with config() method from dotenv.
   */

  const docConfig = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('The Items API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('circuits')
    .addTag('competitions')
    .addTag('drivers')
    .addTag('teams')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:5173', // specify the allowed origin
    methods: ['GET', 'POST'], // specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // specify allowed headers
    exposedHeaders: ['Content-Length'], // specify headers exposed to the client
    credentials: true, // enable sending cookies across domains
  });

  await app.listen(3000);
}
bootstrap();
