import { HttpRequest } from '@smithy/protocol-http';
import { formatUrl } from '@aws-sdk/util-format-url';

import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';

import { Hash } from '@aws-sdk/hash-node';
import { s3Client } from './S3Client';

export const presigner = new S3RequestPresigner({
  region: s3Client.config.region,
  credentials: s3Client.config.credentials,
  sha256: Hash.bind(null, 'sha256'), // In Node.js
  //sha256: Sha256 // In browsers
});

export const generateUploadUrl = async (key: string, expiresIn: number) => {
  const request = new HttpRequest({
    protocol: 'https:',
    hostname: `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`,
    method: 'PUT',
    path: `/${key}`,
    headers: {
      'content-type': 'image/webp',
    },
  });

  const signedRequest = await presigner.presign(request, {
    expiresIn: expiresIn,
  });

  return formatUrl(signedRequest);
};
