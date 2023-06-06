import { Router } from 'express';
import { authorization, sendMessage } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { MessageController } from '@/controllers';

const router = Router();

router.post(
  '/',
  asyncControllerWrapper(sendMessage),
  authorization,
  asyncControllerWrapper(MessageController.sendMessage),
);

router.get('/', authorization, asyncControllerWrapper(MessageController.getMessages));

export default router;
