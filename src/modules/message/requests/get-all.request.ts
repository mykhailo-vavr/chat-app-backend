import { Message } from '@/database/models';
import { PickModelAttributes, TypedReqQuery } from '@/types';

export type GetAllRequest = TypedReqQuery<PickModelAttributes<Message, 'recipientId' | 'senderId'>>;
