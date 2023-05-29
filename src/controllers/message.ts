import { Message } from '@/models';
import { TypedReqBody, TypedReqQuery, Response, CreationAttributes } from '@/types';
import { statusCodes } from '@/utils';
import { Op } from 'sequelize';

export const sendMessage = async (req: TypedReqBody<CreationAttributes<Message>>, res: Response) => {
  try {
    const { recipientId, senderId, message } = req.body;
    await Message.create({
      senderId,
      recipientId,
      message,
    });

    res.status(statusCodes.created).json('Message sent');
  } catch (e) {
    console.error(e);
    res.status(statusCodes.internalServerError).json('Error while sending message');
  }
};

export const getMessages = async (req: TypedReqQuery, res: Response) => {
  try {
    const { recipientId, senderId } = req.query as Record<string, string>;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId, recipientId },
          { senderId: recipientId, recipientId: senderId },
        ],
      },

      order: ['createdAt', 'DESC'],
    });

    res.status(statusCodes.ok).json({ messages });
  } catch (e) {
    console.error(e);
    res.status(statusCodes.internalServerError).json('Error while getting messages');
  }
};
