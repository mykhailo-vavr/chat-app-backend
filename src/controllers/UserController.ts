import { User } from '@/models';
import { BaseResponse, GetUserByPkRequest, GetUsersRequest } from '@/schemas';
import { statusCodes } from '@/utils';
import { Op } from 'sequelize';

export class UserController {
  static async getUserByPk(req: GetUserByPkRequest, res: BaseResponse) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

      if (!user) {
        res.status(statusCodes.notFound).json('There is no user with such id');
      }

      res.status(statusCodes.ok).json(user);
    } catch (e) {
      res.status(statusCodes.internalServerError).json('Error while getting user');
    }
  }

  static async getUsers(req: GetUsersRequest, res: BaseResponse) {
    try {
      const { firstName, lastName, id } = req.query;

      const users = await User.findAll({
        where: {
          ...(firstName && { firstName: { [Op.iLike]: `%${firstName}%` } }),
          ...(lastName && { lastName: { [Op.iLike]: `%${lastName}%` } }),
          ...(id && { id: { [Op.ne]: id } }),
        },
        attributes: { exclude: ['password'] },
      });

      res.status(statusCodes.ok).json(users);
    } catch (e) {
      res.status(statusCodes.internalServerError).json('Error while getting users');
    }
  }
}
