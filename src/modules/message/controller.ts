import { Response } from '@/types';
import { statusCodes } from '@/utils';
import { MessageService } from './service';
import { CreateRequest, GetAllRequest } from './requests';

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  async create({ body }: CreateRequest, res: Response) {
    await this.messageService.create(body);
    res.status(statusCodes.ok).json('Message sent');
  }

  async getAll({ query }: GetAllRequest, res: Response) {
    const messages = await this.messageService.getAll(query.recipientId, query.senderId);
    res.status(statusCodes.ok).json(messages);
  }
}
