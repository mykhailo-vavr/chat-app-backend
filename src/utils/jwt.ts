import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const sign = (payload: Record<string, any>, options: jwt.SignOptions = { expiresIn: '1h' }) =>
  jwt.sign(payload, process.env.AUTH_JWT_SECRET || '', options);

export const verify = (token: string, options?: jwt.VerifyOptions) =>
  jwt.verify(token, process.env.AUTH_JWT_SECRET || '', options);
