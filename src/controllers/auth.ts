import { User, VerifyTFA } from '@/models';
import { TypedReqBody, Response, CreationAttributes, Request } from '@/types';
import { statusCodes } from '@/utils/api';
import { generateCode, hash, sendEmail, validateHash } from '@/utils';
import { sign, verify } from '@/utils/jwt';
import { Op } from 'sequelize';

export const signUpController = async (req: TypedReqBody<CreationAttributes<User>>, res: Response) => {
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
};

export const signInController = async (req: TypedReqBody<CreationAttributes<User>>, res: Response) => {
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

    await VerifyTFA.destroy({
      where: { email },
    });

    await VerifyTFA.create({
      email,
      code: hashedCode,
    });

    await sendEmail({ to: email, html: `<h1>${code}</h1>`, subject: 'Verification code' });

    const token = sign({ user: { email, id: user.id } });

    res.status(statusCodes.ok).json({ token });
  } catch (e) {
    console.error(e);
    res.status(statusCodes.internalServerError).json('Error while sign in user');
  }
};

export const verifyTFA = async (req: TypedReqBody<CreationAttributes<VerifyTFA>>, res: Response) => {
  const { email, code } = req.body;

  try {
    const verifyTFAInfo = await VerifyTFA.findOne({ where: { email } });
    const authToken = verify(req.headers.authorization || '');

    if (!verifyTFAInfo) {
      res.status(statusCodes.unauthorized).send('Code or email are incorrect');
      return;
    }
    console.info(code, verifyTFAInfo.code);

    const validCode = await validateHash(String(code), verifyTFAInfo.code);

    if (!validCode) {
      res.status(statusCodes.unauthorized).send('Code or email are incorrect');
      return;
    }

    const token = sign(authToken as Record<string, any>);

    res.status(statusCodes.ok).json({ token });
  } catch (e) {
    console.error(e);
    res.status(statusCodes.internalServerError).json('Error while sign in user');
  }
};

export const verifyController = async (req: Request, res: Response) => {
  res.json(true);
};
