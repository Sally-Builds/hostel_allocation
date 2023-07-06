import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import HttpException from '@/utils/exceptions/httpExceptions';
import IUser from '../interfaces/user.interface';

export class UserController {
  private _service;

  constructor(Service: UserService) {
    this._service = Service;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, reg_no, department, gender, password }: Omit<IUser, 'role'> = req.body;
      const user = await this._service.Register(name, reg_no, department, gender, password);

      res.status(201).json({
        user,
      });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
}

export default new UserController(new UserService());
