import * as nodemailer from 'nodemailer';

import config from '@shared/config/env.const';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailProvider, SendEmailOptions } from '@shared/email/email-provider.interface';

export class NodemailerEmailProvider implements EmailProvider {
  private transportOptions: SMTPTransport.Options = {
    host: config.emailSender.host!,
    port: Number(config.emailSender.port),
    secure: config.emailSender.secure === 'true',
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
  };
  private transporter = nodemailer.createTransport(this.transportOptions);

  async send(options: SendEmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: config.emailSender.email,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
