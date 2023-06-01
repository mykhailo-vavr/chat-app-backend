import { Router } from 'express';
import auth from './authentication';
import message from './message';
import user from './user';

const router = Router();

router.use('/auth', auth);
router.use('/messages', message);
router.use('/users', user);

export default router;
