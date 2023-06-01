import { Router } from 'express';
import { authorization } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { UserController } from '@/controllers';

const router = Router();

router.get('/', authorization, asyncControllerWrapper(UserController.getUsers));

router.get('/:id', authorization, asyncControllerWrapper(UserController.getUserByPk));

export default router;
