import { User, VerifyCode } from '@/models';
import { TypedReqBody, CreationAttributes } from '@/types';

export type VerifyCodeRequest = TypedReqBody<
  Pick<CreationAttributes<User>, 'email'> & Pick<CreationAttributes<VerifyCode>, 'code'>
>;
