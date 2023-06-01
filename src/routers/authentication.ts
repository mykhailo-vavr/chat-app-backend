import { Router } from 'express';
import { AuthenticationController } from '@/controllers';
import { asyncControllerWrapper } from '@/utils';

const router = Router();

router.post('/sign-up', asyncControllerWrapper(AuthenticationController.signUp));

router.post('/sign-in', asyncControllerWrapper(AuthenticationController.signIn));

router.post('/verify-code', asyncControllerWrapper(AuthenticationController.verifyCode));

router.get('/refresh-token', AuthenticationController.refreshToken);

export default router;
