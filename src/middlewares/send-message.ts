import { ValidationService } from '@/services';
import { NextFunction, Request, Response } from '@/types';
import { statusCodes } from '@/utils';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ValidationService.sendMessageBody(req.body);

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCodes.badRequest).send('Invalid req.body schema');
  }
};
