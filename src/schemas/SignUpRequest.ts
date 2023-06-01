import { User } from '@/models';
import { TypedReqBody, CreationAttributes } from '@/types';

export type SignUpRequest = TypedReqBody<CreationAttributes<User>>;
