import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //tudo que nao esta definido retira
      forbidNonWhitelisted: true, //gera um erro caso uma propriedade não deveria existir
      transform: true, //transforma os dados que chegarem para course e tipa para DTO course
    }),
  );
  await app.listen(3000);
}
bootstrap();
