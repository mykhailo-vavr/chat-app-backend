import { User, VerifyCode } from '@/models';
import { statusCodes } from '@/utils/api';
import { generateCode, hash, sendEmail, validateHash } from '@/utils';
import { Op } from 'sequelize';
import { TokenService } from '@/services';
import { RefreshTokenRequest, SignUpRequest, VerifyCodeRequest, SignInRequest, BaseResponse } from '@/schemas';

// TODO: Bearer token
// TODO: Methods for res

export class AuthenticationController {
  static async signUp(req: SignUpRequest, res: BaseResponse) {
    const { firstName, lastName, password, email, phone } = req.body;

    try {
      const user = await User.findOne({ where: { [Op.or]: [{ email }, { phone }] } });

      if (user) {
        res.status(statusCodes.conflict).json('User with such email or phone is already exists');
        return;
      }

      const hashedPassword = await hash(password);

      await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
      });

      console.info('User was created successfully');
      res.status(statusCodes.created).json('User was created successfully');
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while signing up user');
    }
  }

  static async signIn(req: SignInRequest, res: BaseResponse) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(statusCodes.conflict).json('Password or email are incorrect');
        return;
      }

      const validPassword = await validateHash(password, user.password);

      if (!validPassword) {
        res.status(statusCodes.unauthorized).send('Password or email are incorrect');
        return;
      }

      const code = generateCode();
      const hashedCode = await hash(code);

      await VerifyCode.destroy({
        where: { email },
      });

      await VerifyCode.create({
        email,
        code: hashedCode,
      });

      await sendEmail({ to: email, html: `<h2>${code}</h2>`, subject: 'Verification code' });

      const verificationToken = TokenService.generate.verification({ user: { email, id: user.id } });

      res.status(statusCodes.ok).json({ verificationToken });
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while sign in user');
    }
  }

  static async verifyCode(req: VerifyCodeRequest, res: BaseResponse) {
    const { email, code } = req.body;

    try {
      const verificationToken = TokenService.verify.verification(req.headers.authorization || '') as {
        user: { id: string };
      };

      const verifyCodeInfo = await VerifyCode.findOne({ where: { email } });

      if (!verifyCodeInfo) {
        res.status(statusCodes.unauthorized).send('Code or email are incorrect');
        return;
      }

      const validCode = await validateHash(String(code), verifyCodeInfo.code);

      if (!validCode) {
        res.status(statusCodes.unauthorized).send('Code or email are incorrect');
        return;
      }

      const accessToken = TokenService.generate.access({ user: { id: verificationToken.user.id } });
      const refreshToken = TokenService.generate.refresh({ user: { id: verificationToken.user.id } });

      res.status(statusCodes.ok).json({ accessToken, refreshToken });
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while sign in user');
    }
  }

  static refreshToken(req: RefreshTokenRequest, res: BaseResponse) {
    const { refreshToken: token } = req.query;

    try {
      const tokenInfo = TokenService.verify.verification(String(token)) as {
        user: { id: string };
      };

      const accessToken = TokenService.generate.access({ user: { id: tokenInfo.user.id } });

      res.status(statusCodes.ok).json({ accessToken });
    } catch (e) {
      console.error(e);
      res.status(statusCodes.internalServerError).json('Error while sign in user');
    }
  }
}
