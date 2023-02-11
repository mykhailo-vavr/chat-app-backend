import { Message } from '@/database/models';
import { PickModelAttributes } from '@/types';

export type GetAllResponse = PickModelAttributes<Message, 'createdAt' | 'senderId' | 'recipientId' | 'message'>[];
