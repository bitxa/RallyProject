import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  config();

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
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
