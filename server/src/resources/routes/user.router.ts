import { Router } from 'express';
import userController, { UserController } from '../controllers/user.controller';
import validation from '@/middleware/validation.middleware';
import userValidation from '../validations/user.validation';

class UserRouter {
  private router = Router();
  private _controller;

  constructor(controller: UserController) {
    this._controller = controller;
    this.router.post('/register', validation(userValidation.create), this._controller.register);
  }

  public getRouter = () => {
    return this.router;
  };
}

export default new UserRouter(userController).getRouter;
