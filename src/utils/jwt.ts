import jwt from 'jsonwebtoken';

export const sign = (payload: Record<string, any>, secret: string, options: jwt.SignOptions = { expiresIn: '1h' }) =>
  jwt.sign(payload, secret, options);

export const verify = (token: string, secret: string, options?: jwt.VerifyOptions) =>
  jwt.verify(token, secret, options);
