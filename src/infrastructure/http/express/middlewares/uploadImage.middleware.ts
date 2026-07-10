import path from 'path';
import { Request } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const storageMemory = multer.memoryStorage(); //upload directly to S3 without saving locally.
const storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = `${crypto.randomUUID()}${ext}`;
    cb(null, baseName);
  },
});

const imageFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed'), false);
  }

  cb(null, true);
};

export const uploadMemory = multer({
  storage: storageMemory,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});
export const uploadDisk = multer({
  storage: storageDisk,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

const profileImage = uploadDisk.single('image');

export const fileUploader = {
  profileImage,
};
