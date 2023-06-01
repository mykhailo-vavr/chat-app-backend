import { User } from '@/models';
import { CreationAttributes, TypedReqParams } from '@/types';

export type GetUserByPkRequest = TypedReqParams<Pick<CreationAttributes<User>, 'id'>>;
