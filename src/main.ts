import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
          .addBasicAuth()
          .setTitle("Users")
          .setDescription("user routes...")
          .setVersion('1.0')
          .addTag("User")
          .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api",app, document);

  app.useGlobalPipes(new ValidationPipe()) // you can also use global
  await app.listen(3000);
}
bootstrap();
