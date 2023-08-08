import { Router } from 'express';
import userController, { UserController } from '../controllers/user.controller';
import validation from '@/middleware/validation.middleware';
import userValidation from '../validations/user.validation';
import authenticate from '@/middleware/authenticate.middleware';

class UserRouter {
  private router = Router();
  private _controller;

  constructor(controller: UserController) {
    this._controller = controller;
    this.router.post('/register', validation(userValidation.create), this._controller.register);
    this.router.post('/login', validation(userValidation.login), this._controller.login);

    this.router.route('/').get(authenticate, userController.getMe);
  }

  public getRouter = () => {
    return this.router;
  };
}

export default new UserRouter(userController).getRouter;
