import { Message } from '@/database/models';
import { decrypt, encrypt } from '@/utils';
import { Op } from 'sequelize';
import { InternalServerError } from '../../common/error';
import { CreateRequest } from './requests';
import { GetAllResponse } from './responses';

export class MessageService {
  constructor(private readonly messageModel: typeof Message) {}

  async create({ recipientId, senderId, message }: CreateRequest['body']): Promise<void> {
    try {
      await this.messageModel.create({
        senderId,
        recipientId,
        message: encrypt(message),
      });
    } catch {
      throw new InternalServerError('Error while sending message');
    }
  }

  async getAll(recipientId: number, senderId: number): Promise<GetAllResponse> {
    try {
      const messages = await this.messageModel.findAll({
        where: {
          [Op.or]: [
            { senderId, recipientId },
            { senderId: recipientId, recipientId: senderId },
          ],
        },

        order: ['createdAt'],
      });

      const formattedMessages = messages.map((message) => ({
        createdAt: message.createdAt,
        senderId: message.senderId,
        recipientId: message.recipientId,
        message: decrypt(message.message),
      }));

      return formattedMessages;
    } catch {
      throw new InternalServerError('Error while getting messages');
    }
  }
}
