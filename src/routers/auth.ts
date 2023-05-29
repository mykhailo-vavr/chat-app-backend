import { Router } from 'express';
import { authorization } from '@/middlewares';
import { signUpController, signInController, verifyController, verifyTFA } from '@/controllers';
import { asyncControllerWrapper } from '@/utils';

const router = Router();

router.post('/sign-up', asyncControllerWrapper(signUpController));

router.post('/sign-in', asyncControllerWrapper(signInController));

router.post('/verify-tfa', authorization, asyncControllerWrapper(verifyTFA));

router.get('/verify-token', authorization, asyncControllerWrapper(verifyController));

export default router;
