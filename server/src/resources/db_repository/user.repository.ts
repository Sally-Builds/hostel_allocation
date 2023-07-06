import userModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class UserRepository {
  /**
   * @
   * @param data - user payload
   * @returns - newly created user
   */
  static async create(data: Partial<IUser>): Promise<IUser> {
    try {
      const user = await userModel.create(data);
      return user;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param reg_no - student registration no(unique)
   * @returns user with that reg_no
   */
  static async getByReg_no(reg_no: string) {
    try {
      return await userModel.findOne({ reg_no });
    } catch (error: any) {
      new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id user id
   * @returns user with the id
   */
  static async getById(id: string) {
    try {
      return await userModel.findOne({ id });
    } catch (error: any) {
      new HttpException(error, 500);
    }
  }

  /**
   * @param query - filter data using some fields
   * @returns all users
   */
  static async getAll(query: any) {
    try {
      return await userModel.find(query);
    } catch (error: any) {
      new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id - user id to update
   * @param data - data to update
   * @returns newly updated user data
   */
  static async update(id: string, data: IUser) {
    try {
      return await userModel.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    } catch (error: any) {
      new HttpException(error, 500);
    }
  }
}
