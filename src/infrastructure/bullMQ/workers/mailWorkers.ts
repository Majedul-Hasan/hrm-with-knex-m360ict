// import { passwordChangedTemplate } from "@shared/utils/emailTemplates/passwordChangedTemplate";
// import { passwordResetTemplate } from "@shared/utils/emailTemplates/passwordResetTemplate";
// import { registrationOtpTemplate } from "@shared/utils/emailTemplates/registrationOtpTemplate";
// import { twoFactorOtpTemplate } from "@shared/utils/emailTemplates/twoFactorOtpTemplate";
// import { welcomeEmail } from "@shared/utils/emailTemplates/welcomeTemplate";
import { Job, Worker } from 'bullmq';
import { bullConnection } from '../connection';
import logger from '@infra/logging/logger';
// import { registrationOtpTemplate } from "@shared/email/emailTemplates/registrationOtpTemplate";
// import { twoFactorOtpTemplate } from "@shared/email/emailTemplates/twoFactorOtpTemplate";
// import { passwordChangedTemplate } from "@shared/email/emailTemplates/passwordChangedTemplate";
// import { passwordResetTemplate } from "@shared/email/emailTemplates/passwordResetTemplate";
// import { welcomeEmail } from "@shared/email/emailTemplates/welcomeTemplate";

interface OtpEmailJobData {
  name: string;

  userName: string;
  email: string;
  subject: string;
  htmlContent?: string;
  otpCode?: string;
  secureLink?: string;
}
/*
export const otpEmailWorker1 = new Worker(
    "email-queue",
    async (job: Job<OtpEmailJobData>) => {
        switch (job.name) {


            // handle verify
            case "registrationOtp":
                {
                    const { userName, email, otpCode, subject } = job.data;
                    await registrationOtpTemplate(userName, subject, email, otpCode as string);
                    return "Otp end job completed";
                }
            case "twoFactorOtp":
                {
                    const { userName, email, otpCode, subject } = job.data;
                    await twoFactorOtpTemplate(userName, subject, email, otpCode as string);
                    return "Otp end job completed";
                }
            case "passwordChangedConfirmation":
                {
                    const { userName, email, subject, secureLink } = job.data;
                    await passwordChangedTemplate(userName, subject, email, secureLink as string);
                    return "Otp end job completed";
                }
            case "passwordResetRequest":
                {
                    const { userName, email, subject, otpCode } = job.data;
                    await passwordResetTemplate(userName, subject, email, otpCode as string);
                    return "Otp end job completed";
                }

            // handle verify


            case "resendParentOtp":
                // handle resend
                break;
        }
    },
    { connection: bullConnection }
);

*/

const handlers = {
  // registrationOtp: async ({ userName, email, otpCode, subject }: OtpEmailJobData) => {
  //     return registrationOtpTemplate(userName, subject, email, otpCode as string);
  // },
  // twoFactorOtp: async ({ userName, email, otpCode, subject }: OtpEmailJobData) => {
  //     return twoFactorOtpTemplate(userName, subject, email, otpCode as string);
  // },
  // passwordChangedConfirmation: async ({ userName, email, subject, secureLink }: OtpEmailJobData) => {
  //     return passwordChangedTemplate(userName, subject, email, secureLink as string);
  // },
  // passwordResetRequest: async ({ userName, email, subject, otpCode }: OtpEmailJobData) => {
  //     return await passwordResetTemplate(userName, subject, email, otpCode as string);
  // },
  // registrationWelcomeEmail: async ({ email, subject, htmlContent }: OtpEmailJobData) => {
  //     // console.log("Received data:", { email, subject, htmlContent });
  //     return await welcomeEmail(email, subject, htmlContent as string);
  // },
  // failedLoginAttempt: async ({ email, subject, htmlContent }: OtpEmailJobData) => {
  //     // console.log("Received data:", { email, subject, htmlContent });
  //     return await welcomeEmail(email, subject, htmlContent as string);
  // },
  // successLoginAttempt: async ({ email, subject, htmlContent }: OtpEmailJobData) => {
  //     // console.log("Received data:", { email, subject, htmlContent });
  //     return await welcomeEmail(email, subject, htmlContent as string);
  // },
};

const otpEmailWorker = new Worker<OtpEmailJobData>(
  'email-queue',
  async job => {
    const handler = handlers[job.name as keyof typeof handlers];
    console.log('Received job data:', handler, job.data);

    if (!handler) {
      throw new Error(`Unknown job type: ${job.name}`);
    }

    // await handler(job.data);
    return 'OTP job completed';
  },
  {
    connection: bullConnection,
    concurrency: 5, // ⭐ important for production
  }
);

otpEmailWorker.on('failed', (job, err) => {
  logger.error(`❌ Email job failed: ${job?.id}`, err);
});

otpEmailWorker.on('completed', job => {
  logger.info(`✅ Email job completed: ${job.id}`);
});

export default otpEmailWorker;
