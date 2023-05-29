import { NextFunction, Request, Response } from '@/types';

export const statusCodes = {
  ok: 200,
  created: 201,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

export const asyncControllerWrapper =
  (callback: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
