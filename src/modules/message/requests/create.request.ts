import { Message } from '@/database/models';
import { TypedReqBody, PickModelAttributes } from '@/types';

export type CreateRequest = TypedReqBody<PickModelAttributes<Message, 'message' | 'recipientId' | 'senderId'>>;
