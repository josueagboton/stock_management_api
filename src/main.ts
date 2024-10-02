/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Stock Management API')
    .setDescription(
      `Découvrez notre API de gestion de stock, un microservice développé avec Node.js NestJS.
       Elle permet aux boutiques et supermarchés d'ajouter des produits, d'éviter les ruptures de stock et de gérer vos fournisseurs
       Si vous aviez de question écrivez nous au +22962931506
       `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    ) // This name here is important for matching up with @ApiBearerAuth() in your controller!// Ajout d'authentification si besoin (ex: JWT)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Chemin pour accéder à Swagger (localhost:3000/api)
  await app.listen(3000);
}
bootstrap();
