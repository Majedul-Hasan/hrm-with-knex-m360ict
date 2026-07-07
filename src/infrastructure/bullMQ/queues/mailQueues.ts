
import { Queue } from "bullmq";
import { bullConnection } from "../connection";


// export const otpQueueEmail = new Queue("otp-queue-email", { connection: bullConnection });
export const otpQueueEmail = new Queue("email-queue", { connection: bullConnection });


// export const requestQueueEmail = new Queue("request-queue-email", { connection: bullConnection });
