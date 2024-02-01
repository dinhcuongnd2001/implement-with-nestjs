// import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import { google } from 'googleapis';
import { docs_v1 } from '@googleapis/docs';

@Injectable()
export class GoogleAuth implements OnModuleInit {
  private auth;
  private Docs: docs_v1.Docs;
  private Client;

  async onModuleInit() {
    // const auth = await authenticate({
    //   keyfilePath: path.join(__dirname, '../../credentials.json'),
    //   scopes: 'https://www.googleapis.com/auth/documents',
    // });

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../../credentials.json'),
      scopes: 'https://www.googleapis.com/auth/documents',
    });
    this.Docs = google.docs({ version: 'v1', auth });
    this.Client = await auth.getClient();
    this.auth = auth;
  }
  async getDocument() {
    // const docs = google.docs('v1');
    // google.options({ auth: this.auth });
    // const currentDocs = await docs.documents.get({
    //   auth: this.auth,
    //   documentId:
    //     process.env.GG_DOCUMENT_ID ||
    //     '1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg',
    // });
    // console.log('data :', currentDocs.data);
    const docs = google.docs({ version: 'v1', auth: this.Client });
    const data = await docs.documents.get({
      auth: this.auth,
      documentId: '1t_DyPR39WwFhE5pq7BLqHRmxDYuIrQMqx5bq1cNvgSg',
    });
  }
}
