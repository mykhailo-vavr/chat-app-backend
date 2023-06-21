import { Message } from '@/models';
import { decrypt, encrypt, statusCodes } from '@/utils';
import { Op } from 'sequelize';
import { BaseResponse, GetMessagesRequest, SendMessageRequest } from '@/schemas';

export class MessageController {
  static async sendMessage(req: SendMessageRequest, res: BaseResponse) {
    try {
      const { recipientId, senderId, message } = req.body;

      await Message.create({
        senderId,
        recipientId,
        message: encrypt(message),
      });

      res.status(statusCodes.created).json('Message sent');
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while sending message');
    }
  }

  static async getMessages(req: GetMessagesRequest, res: BaseResponse) {
    try {
      const { recipientId, senderId } = req.query;
      const messages = await Message.findAll({
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

      res.status(statusCodes.ok).json(formattedMessages);
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while getting messages');
    }
  }
}
