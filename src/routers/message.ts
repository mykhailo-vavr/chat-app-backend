import { Router } from 'express';
import { authorization } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { getMessages, sendMessage } from '@/controllers';

const router = Router();

router.post('/send', authorization, asyncControllerWrapper(sendMessage));

router.get('/', authorization, asyncControllerWrapper(getMessages));

export default router;
