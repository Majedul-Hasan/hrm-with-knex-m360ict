import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

console.log(process.cwd());

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

/**
 * -----------------------------
 * 1️⃣ Environment Schema
 * -----------------------------
 */

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  SERVICE_NAME: z.string().default('development'),
  PORT: z.string(),
  HOST_URL: z.string().optional(),

  AI_END_POINT: z.string().optional(),
  SUPER_ADMIN_PASSWORD: z.string().min(1),

  BCRYPT_SALT_ROUNDS: z.string().default('10'),
  OTP_ACCESS_EXPIRES_IN: z.string().default('5'),
  TAX_CODE: z.string().optional(),

  // JWT
  JWT_SECRET: z.string().min(1),

  EXPIRES_IN: z.string().optional(),
  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.string().optional(),
  RESET_PASS_SECRET: z.string().min(1),
  RESET_PASS_SECRET_EXPIRES_IN: z.string(),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_HOST_EMAIL: z.string().email(),
  SMTP_APP_PASS: z.string(),
  SMTP_FROM: z.string().email().optional(),
  EMAIL_SECURE: z.string().default('false'),

  // Redis
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.string().default('6379'),
  REDIS_PW: z.string().optional(),
  REDIS_URL: z.string().optional(),
  // Database
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('5432'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().default('hrm-360ict'),
  DB_URL: z.string().optional(),
  DB_POOL_MIN: z.string().default('2'),
  DB_POOL_MAX: z.string().default('10'),

  // OTP Secrets
  SIGNUP_OTP_SECRET: z.string().optional(),
  VERIFY_OTP_SECRET: z.string().optional(),
  RESET_PASSWORD_SECRET: z.string().optional(),
  FORGET_PASSWORD_SECRET: z.string().optional(),

  // S3
  S3_ACCESS_KEY: z.string().min(1),
  S3_SECRET_KEY: z.string().min(1),
  S3_REGION: z.string().min(1),
  S3_BUCKET_NAME: z.string().min(1),
  S3_ENDPOINT: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

export const config = {
  env: env.NODE_ENV,
  port: Number(env.PORT),
  host_url: env.HOST_URL,
  super_admin_password: env.SUPER_ADMIN_PASSWORD,
  bcrypt_salt_rounds: Number(env.BCRYPT_SALT_ROUNDS || 12),
  otp_expiry_time: Number(env.OTP_ACCESS_EXPIRES_IN),
  tax_code: env.TAX_CODE,

  jwt: {
    jwt_secret: env.JWT_SECRET,
    access_expires_in: env.EXPIRES_IN || '30d',
    refresh_token_secret: env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: env.RESET_PASS_SECRET,
    reset_pass_token_expires_in: env.RESET_PASS_SECRET_EXPIRES_IN,
  },

  emailSender: {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    email: env.SMTP_HOST_EMAIL,
    app_pass: env.SMTP_APP_PASS,
    from: env.SMTP_FROM || env.SMTP_HOST_EMAIL,
    secure: env.EMAIL_SECURE,
  },
  redis: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    password: env.REDIS_PW,
    url: env.REDIS_URL,
  },

  db: {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    password: env.DB_PASSWORD,
    usr: env.DB_USER,
    name: env.DB_NAME,
    url: env.DB_URL,
    poolMin: Number(env.DB_POOL_MIN),
    poolMax: Number(env.DB_POOL_MAX),
  },

  otpSecret: {
    signup_otp_secret: env.SIGNUP_OTP_SECRET,
    verify_otp_secret: env.VERIFY_OTP_SECRET,
    reset_password_secret: env.RESET_PASSWORD_SECRET,
    forget_password_secret: env.FORGET_PASSWORD_SECRET,
  },

  S3: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
    region: env.S3_REGION,
    bucketName: env.S3_BUCKET_NAME,
    endpoint: env.S3_ENDPOINT,
  },
};

export default config;
