import { User } from '@/models';
import { TypedReqBody, CreationAttributes } from '@/types';

export type SignInRequest = TypedReqBody<Pick<CreationAttributes<User>, 'email' | 'password'>>;
