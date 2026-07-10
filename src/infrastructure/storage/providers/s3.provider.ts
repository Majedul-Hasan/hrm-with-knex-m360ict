import fs from 'fs';
import path from 'path';

import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

import { s3Client } from '../s3/S3Client';
import config from '@shared/config/env.const';

export class S3Provider {
  private bucket = config.S3.bucketName;

  async uploadFromPath(filePath: string, folder: string) {
    const fileStream = fs.createReadStream(filePath);

    const ext = path.extname(filePath);
    const fileName = `${crypto.randomUUID()}${ext}`;
    const key = `${folder}/${fileName}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileStream,
      })
    );

    const url = `https://${this.bucket}.s3.amazonaws.com/${key}`;

    // delete temp file
    fs.unlink(filePath, () => {});

    return {
      key,
      url,
    };
  }

  async upload(file: Express.Multer.File, folder?: string) {
    const ext = file.originalname.split('.').pop();

    const key = folder ? `${folder}/${crypto.randomUUID()}.${ext}` : `${crypto.randomUUID()}.${ext}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return {
      key,
      url: this.getPublicUrl(key),
    };
  }

  async delete(key: string) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
  }

  async getSignedUrl(key: string, expires = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn: expires });
  }

  getPublicUrl(key: string) {
    return `https://${this.bucket}.s3.${config.S3.region}.amazonaws.com/${key}`;
  }
}
