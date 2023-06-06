import { Router } from 'express';
import { AuthenticationController } from '@/controllers';
import { asyncControllerWrapper } from '@/utils';
import { signIn, signUp, verifyCode } from '@/middlewares';

const router = Router();

router.post('/sign-up', asyncControllerWrapper(signUp), asyncControllerWrapper(AuthenticationController.signUp));

router.post('/sign-in', asyncControllerWrapper(signIn), asyncControllerWrapper(AuthenticationController.signIn));

router.post(
  '/verify-code',
  asyncControllerWrapper(verifyCode),
  asyncControllerWrapper(AuthenticationController.verifyCode),
);

router.get('/refresh-token', AuthenticationController.refreshToken);

export default router;
