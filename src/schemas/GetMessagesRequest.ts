import { Message } from '@/models';
import { CreationAttributes, TypedReqQuery } from '@/types';

export type GetMessagesRequest = TypedReqQuery<Pick<CreationAttributes<Message>, 'recipientId' | 'senderId'>>;
