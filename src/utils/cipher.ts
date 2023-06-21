import { ConfigService } from '@/services';
import { privateDecrypt, publicEncrypt } from 'crypto';

export const encrypt = (message: string) => {
  const buffer = Buffer.from(message);
  const encryptedBuffer = publicEncrypt(ConfigService.get('CIPHER_PUBLIC_KEY') || '', buffer);
  const encryptedMessage = encryptedBuffer.toString('base64');

  return encryptedMessage;
};

export const decrypt = (encryptedMessage: string) => {
  const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
  const decryptedBuffer = privateDecrypt(ConfigService.get('CIPHER_PRIVATE_KEY') || '', encryptedBuffer);
  const decryptedMessage = decryptedBuffer.toString();

  return decryptedMessage;
};
