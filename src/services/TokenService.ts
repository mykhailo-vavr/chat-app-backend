import { sign, verify } from '@/utils/jwt';
import { ConfigService } from './ConfigService';

export class TokenService {
  static get generate() {
    return {
      access: (payload: Record<string, any>) =>
        sign(payload, ConfigService.get('ACCESS_TOKEN_SECRET'), { expiresIn: '10m' }),
      refresh: (payload: Record<string, any>) =>
        sign(payload, ConfigService.get('REFRESH_TOKEN_SECRET'), { expiresIn: '1h' }),
      verification: (payload: Record<string, any>) =>
        sign(payload, ConfigService.get('VERIFICATION_TOKEN_SECRET'), { expiresIn: '5m' }),
    };
  }

  static get verify() {
    return {
      access: (token: string) => verify(token, ConfigService.get('ACCESS_TOKEN_SECRET')),
      refresh: (token: string) => verify(token, ConfigService.get('REFRESH_TOKEN_SECRET')),
      verification: (token: string) => verify(token, ConfigService.get('VERIFICATION_TOKEN_SECRET')),
    };
  }
}
