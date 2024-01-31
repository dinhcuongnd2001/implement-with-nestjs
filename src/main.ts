import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { google } from 'googleapis';
import { docs } from '@googleapis/docs';
import * as path from 'path';
import { authenticate } from '@google-cloud/local-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // config

  // logger
  app.useLogger(app.get(LoggerService));

  //

  // auto validate
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true, // not console.log()
      whitelist: true, // just get all property defined in dto class, other property is remove
      transform: true, // convert object form req to exaclly data defined in dto
    }),
  );

  // cath all exception http error

  // app.useGlobalFilters(new HttpExceptionFilter());

  // initial:

  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../google_secret.json'),
    scopes: 'https://www.googleapis.com/auth/documents',
  });

  const docs = google.docs('v1');
  google.options({ auth });

  const res = await docs.documents.get({
    documentId: '1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg',
  });

  // const data = await docs.documents.create({
  //   requestBody: {
  //     title: 'Test create document',
  //   },
  // });

  console.log(res.data);

  // console.log('currentData :', currentData);

  await app.listen(process.env.PORT || 3055);
}
bootstrap();
