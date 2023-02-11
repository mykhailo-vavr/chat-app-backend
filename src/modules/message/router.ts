import { Router } from 'express';
import { authorization } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { Message } from '@/database/models';
import { MessageService } from './service';
import { MessageController } from './controller';

const messageRouter = Router();
const messageService = new MessageService(Message);
const messageController = new MessageController(messageService);

messageRouter.post('/', authorization, asyncControllerWrapper(messageController.create.bind(messageController)));

messageRouter.get('/', authorization, asyncControllerWrapper(messageController.getAll.bind(messageController)));

export { messageRouter };
