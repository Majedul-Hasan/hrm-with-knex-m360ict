import { Queue } from 'bullmq';
import { bullConnection } from '../connection';

export const otpQueueEmail = new Queue('email-queue', { connection: bullConnection });
