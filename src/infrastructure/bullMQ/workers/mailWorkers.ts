import { Worker } from 'bullmq';
import { bullConnection } from '../connection';
import logger from '@infra/logging/logger';
import { passwordResetTemplate } from '@shared/email/emailTemplates/passwordResetTemplate';

interface OtpEmailJobData {
  name: string;

  userName: string;
  email: string;
  subject: string;
  htmlContent?: string;
  otpCode?: string;
  secureLink?: string;
}

const handlers = {
  // passwordChangedConfirmation: async ({ userName, email, subject, secureLink }: OtpEmailJobData) => {
  //   return passwordChangedTemplate(userName, subject, email, secureLink as string);
  // },
  passwordResetRequest: async ({ userName, email, subject, otpCode }: OtpEmailJobData) => {
    return await passwordResetTemplate(userName, subject, email, otpCode as string);
  },
};

const otpEmailWorker = new Worker<OtpEmailJobData>(
  'email-queue',
  async job => {
    const handler = handlers[job.name as keyof typeof handlers];
    console.log('Received job data:', handler, job.data);
    if (!handler) {
      throw new Error(`Unknown job type: ${job.name}`);
    }
    await handler(job.data);
    return 'OTP job completed';
  },
  {
    connection: bullConnection,
    concurrency: 5,
  }
);

otpEmailWorker.on('failed', (job, err) => {
  logger.error(`❌ Email job failed: ${job?.id}`, err);
});

otpEmailWorker.on('completed', job => {
  logger.info(`✅ Email job completed: ${job.id}`);
});

export default otpEmailWorker;
