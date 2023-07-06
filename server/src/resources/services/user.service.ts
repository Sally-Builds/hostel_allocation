import bcrypt from 'bcryptjs';
import UserRepository from '../db_repository/user.repository';
import IUser from '../interfaces/user.interface';
import HttpException from '@/utils/exceptions/httpExceptions';
// import jwt from 'jsonwebtoken';

export default class UserService {
  public Register = async (
    name: string,
    reg_no: string,
    department: string,
    gender: string,
    password: string,
  ): Promise<IUser> => {
    try {
      if (await UserRepository.getByReg_no(reg_no)) {
        throw new HttpException('Registration number already exist', 400);
      }
      const user: Omit<IUser, 'role'> = {
        name,
        reg_no,
        department,
        gender,
        password: await this.encryptPassword(password),
      };
      const newUser = await UserRepository.create(user);
      return newUser;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public login = async (reg_no: string, password: string): Promise<IUser> => {
    try {
      const user = await UserRepository.getByReg_no(reg_no);
      if (!user) throw new HttpException('Email or Password invalid', 404);
      if (!(await this.verifyPassword(password, user.password)))
        throw new HttpException('Email or Password invalid', 404);

      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  private async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  private async verifyPassword(passwordString: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(passwordString, hash);
  }
}
