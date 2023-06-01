import { Message } from '@/models';
import { CreationAttributes, TypedReqBody } from '@/types';

export type SendMessageRequest = TypedReqBody<
  Pick<CreationAttributes<Message>, 'message' | 'recipientId' | 'senderId'>
>;
