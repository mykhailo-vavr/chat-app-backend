import { TokenService } from '@/services';
import { NextFunction, Request, Response } from '@/types';
import { statusCodes } from '@/utils';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Access denied');
    }

    TokenService.verify.access(token);

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCodes.forbidden).send('Access denied');
  }
};
