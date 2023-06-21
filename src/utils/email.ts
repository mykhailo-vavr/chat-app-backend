import { ConfigService } from '@/services';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async (options: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ConfigService.get('EMAIL_USER'),
      pass: ConfigService.get('EMAIL_PASS'),
    },
  });

  await transporter.sendMail({
    from: 'no-reply',
    ...options,
  });
};
