// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './user/auth/auth.module';

// Define the bootstrap function
async function bootstrap() {
  // Create a NestJS application instance by passing the AppModule to the NestFactory
  const app = await NestFactory.create(AppModule);

  // Use DocumentBuilder to create a new Swagger document configuration
  const courseOptions = new DocumentBuilder()
    .setTitle('Courses API') // Set the title of the API
    .setDescription('Courses API description') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .build(); // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, courseOptions, {
    include: [CourseModule],
  });
  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/course', app, document);

  const userOptions = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const documentUser = SwaggerModule.createDocument(app, userOptions, {
    include: [UserModule],
  });

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/user', app, documentUser);

  const authOptions = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const documentAuth = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/auth', app, documentAuth);

  // Start the application and listen for requests on port 3000
  app.enableCors();
  await app.listen(5004);
}

// Call the bootstrap function to start the application
bootstrap();
