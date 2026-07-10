export interface StorageProvider {
    upload(
        file: Express.Multer.File,
        folder?: string
    ): Promise<{ key: string; url: string }>;

    delete(key: string): Promise<void>;

    getSignedUrl(key: string, expires?: number): Promise<string>;

    getPublicUrl(key: string): string;
}