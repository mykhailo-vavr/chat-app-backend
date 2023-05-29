import { Router } from 'express';
import auth from './auth';
import message from './message';

const router = Router();

router.use('/auth', auth);
router.use('/messages', message);

export default router;
