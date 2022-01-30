import { NestFactory } from '@nestjs/core';
// import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Security middlewares
  app.use(cookieParser());
  // app.use(
  // csurf({
  // cookie: true,
  // }),
  // );
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const { PROCESS_PORT, SWAG_TITLE, SWAG_DESC, SWAG_VERSION, SWAG_ENDPOINT } =
    process.env;

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAG_TITLE)
    .setDescription(SWAG_DESC)
    .setVersion(SWAG_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAG_ENDPOINT, app, document);

  await app.listen(PROCESS_PORT);
  console.log(`App is running on port: ${PROCESS_PORT}`);
}
bootstrap();
