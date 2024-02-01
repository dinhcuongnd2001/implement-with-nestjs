import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { google } from 'googleapis';
import { docs } from '@googleapis/docs';
import * as path from 'path';
import { authenticate } from '@google-cloud/local-auth';
import { GoogleAuth } from './google-auth/google-auth';

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

  GoogleAuth;
  // cath all exception http error

  // app.useGlobalFilters(new HttpExceptionFilter());

  // initial:
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../credentials.json'), // Path to your JSON key file
    scopes: ['https://www.googleapis.com/auth/documents'], // Scope for Google Docs
  });

  async function writeGoogleDocs(documentId, requests) {
    try {
      const docs = google.docs({ version: 'v1', auth }); // Create a Google Docs API client

      // Send a batchUpdate request to modify the document
      const writer = await docs.documents.batchUpdate({
        documentId, // ID of the document to update
        requestBody: {
          requests, // Array of requests detailing the changes to be made
        },
      });
      return writer; // Return the response from the Google Docs API
    } catch (error) {
      console.error('error', error); // Log any errors that occur
    }
  }

  async function readGoogleDocs(documentId: string) {
    try {
      const docs = google.docs({ version: 'v1', auth }); // Create a Google Docs API client

      // Retrieve the document content
      const response = await docs.documents.get({ documentId }); // ID of the document to read
      return response.data; // Return the document data
    } catch (error) {
      console.error('error', error); // Log any errors that occur
    }
  }

  // const data = await readGoogleDocs(
  //   '1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg',
  // );

  await writeGoogleDocs('1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg', [
    {
      insertText: {
        location: {
          index: 1, // Specify the index to insert text
        },
        text: 'Hello CodingWithAdo Fans!\n', // Text to be inserted
      },
    },
  ]);

  // new GoogleAuth().getDocument();
  await app.listen(process.env.PORT || 3055);
}
bootstrap();
