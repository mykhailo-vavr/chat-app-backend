import { User } from '@/models';
import { CreationAttributes, TypedReqQuery } from '@/types';

export type GetUsersRequest = TypedReqQuery<Partial<Pick<CreationAttributes<User>, 'id' | 'firstName' | 'lastName'>>>;
