import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { s3Client } from './S3Client';

// **Abort Multipart Upload (Optional)**
const abortMultipartUpload = async (Bucket: string, Key: string, UploadId: string) => {
  try {
    const abortCommand = new AbortMultipartUploadCommand({
      Bucket,
      Key,
      UploadId,
    });
    await s3Client.send(abortCommand);
  } catch (error) {
    console.error('Error aborting multipart upload:', error);
  }
};

// Export file uploader methods
export const S3Uploader = {
  abortMultipartUpload,
};
