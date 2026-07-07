import config from '@shared/config/env.const';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: config.emailSender.host,
  port: Number(config.emailSender.port),
  secure: config.emailSender.secure === 'true',
  auth: {
    user: config.emailSender.email,
    pass: config.emailSender.app_pass,
  },
});
