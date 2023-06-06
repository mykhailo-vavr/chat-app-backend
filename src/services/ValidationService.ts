import { number, object, string } from 'yup';

export class ValidationService {
  static async signUpBody(data: unknown) {
    const schema = object().shape({
      firstName: string()
        .max(20)
        .matches(/^[a-zA-Z]+$/)
        .required(),
      lastName: string()
        .max(20)
        .matches(/^[a-zA-Z]+$/)
        .required(),
      email: string().max(100).email().required(),
      phone: string().max(20).required(),
      password: string().max(255).required(),
    });

    return schema.validate(data);
  }

  static async signInBody(data: unknown) {
    const schema = object().shape({
      email: string().max(100).email().required(),
      password: string().max(255).required(),
    });

    return schema.validate(data);
  }

  static async verifyCodeBody(data: unknown) {
    const schema = object().shape({
      code: string().length(6).matches(/^\d+$/).required(),
    });

    return schema.validate(data);
  }

  static async sendMessageBody(data: unknown) {
    const schema = object().shape({
      message: string().required(),
      senderId: number().min(1).required(),
      recipientId: number().min(1).required(),
    });

    return schema.validate(data);
  }
}
