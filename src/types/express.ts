import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';

export type Response = ExpressResponse;
export type Request = ExpressRequest;
export type NextFunction = ExpressNextFunction;

// export interface Request<T = unknown> extends ExpressRequest {
//   body: T;
// }

export type TypedReqBody<T = any> = ExpressRequest<any, any, T>;

export type TypedReqQuery<T = any> = ExpressRequest<any, any, any, T>;
