import 'dotenv/config';
import { Client } from '@elastic/elasticsearch';

export const es = new Client({
  node: process.env.ES_URL,
  auth: { apiKey: process.env.ES_API_KEY || '' },
  serverMode: 'serverless',
});
