import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: [process.env.CORS_ORIGIN],
    methods: '*',
    credentials: true,
  });

  app.setGlobalPrefix(process.env.ENDPOINT_PREFIX);
  await app.listen(3000);
}
bootstrap();
