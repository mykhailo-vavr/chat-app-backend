import { sign, verify } from '@/utils';
import dotenv from 'dotenv';

dotenv.config();

export class TokenService {
  static get generate() {
    return {
      access: (payload: Record<string, any>) =>
        sign(payload, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '10m' }),
      refresh: (payload: Record<string, any>) =>
        sign(payload, process.env.REFRESH_TOKEN_SECRET || '', { expiresIn: '1h' }),
      verification: (payload: Record<string, any>) =>
        sign(payload, process.env.VERIFICATION_TOKEN_SECRET || '', { expiresIn: '5m' }),
    };
  }

  static get verify() {
    return {
      access: (token: string) => verify(token, process.env.ACCESS_TOKEN_SECRET || ''),
      refresh: (token: string) => verify(token, process.env.REFRESH_TOKEN_SECRET || ''),
      verification: (token: string) => verify(token, process.env.VERIFICATION_TOKEN_SECRET || ''),
    };
  }
}
