import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './common/exceptions/validation.exception';
import { GqlValidationFilter } from './common/filters/gql-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.useGlobalFilters(new GqlValidationFilter());
  
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });
  
  await app.listen(process.env.PORT ?? 3000, '127.9.0.1');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();