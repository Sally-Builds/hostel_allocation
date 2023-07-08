import { Router } from 'express';
import hostelController, { HostelController } from '../controllers/hostel.controller';
import validation from '@/middleware/validation.middleware';
import hostelValidation from '../validations/hostel.validation';
import roomRouter from './room.router';

class HostelRouter {
  private router = Router({ mergeParams: true });
  private _controller;

  constructor(controller: HostelController, roomRouter: Router) {
    this._controller = controller;
    this.router.use('/:hostel_id/rooms', roomRouter);
    this.router.route('/').post(validation(hostelValidation.create), controller.create).get(controller.getAll);
  }

  public getRouter = () => {
    return this.router;
  };
}

export default new HostelRouter(hostelController, roomRouter()).getRouter;
