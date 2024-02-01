import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import { google } from 'googleapis';

@Injectable()
export class GoogleAuth implements OnModuleInit {
  private auth: OAuth2Client;

  async onModuleInit() {
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, '../../google_secret.json'),
      scopes: 'https://www.googleapis.com/auth/documents',
    });
    this.auth = auth;
  }
  async getDocument(documentId?: string) {
    const docs = google.docs('v1');
    google.options({ auth: this.auth });
    const data = await docs.documents.get({
      documentId: documentId || '1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg',
    });
    console.log('data :', data);
  }
}
