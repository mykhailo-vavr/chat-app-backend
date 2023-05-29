import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

dotenv.config();

export const sendEmail = async (options: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'no-reply',
    ...options,
  });
};
