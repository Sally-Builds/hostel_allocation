import { Router } from 'express';
import hostelController, { HostelController } from '../controllers/hostel.controller';
import validation from '@/middleware/validation.middleware';
import hostelValidation from '../validations/hostel.validation';

class HostelRouter {
  private router = Router();
  private _controller;

  constructor(controller: HostelController) {
    this._controller = controller;
    this.router.route('/').post(validation(hostelValidation.create), hostelController.create);
  }

  public getRouter = () => {
    return this.router;
  };
}

export default new HostelRouter(hostelController).getRouter;
