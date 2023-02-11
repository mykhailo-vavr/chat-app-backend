import { Router } from 'express';
import { authenticationRouter, messageRouter, userRouter } from './modules';

const router = Router();

router.use('/auth', authenticationRouter);
router.use('/messages', messageRouter);
router.use('/users', userRouter);

export default router;
