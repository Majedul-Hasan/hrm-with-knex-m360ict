import { S3Provider } from "./providers/s3.provider";

const provider = new S3Provider();

export const StorageService = {
    upload: provider.upload.bind(provider),
    uploadFromPath: provider.uploadFromPath.bind(provider),
    delete: provider.delete.bind(provider),
    getSignedUrl: provider.getSignedUrl.bind(provider),
    getPublicUrl: provider.getPublicUrl.bind(provider),
};