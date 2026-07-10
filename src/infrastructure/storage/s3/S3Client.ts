import { S3Client } from '@aws-sdk/client-s3';
import config from '@shared/config/env.const';

// Configure AWS (S3-compatible)

export const s3Client = new S3Client({
  region: config.S3.region,
  credentials: {
    accessKeyId: config.S3.accessKeyId as string,
    secretAccessKey: config.S3.secretAccessKey as string,
  },
});
