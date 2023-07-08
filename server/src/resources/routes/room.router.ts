import { Router } from 'express';
import roomController, { RoomController } from '../controllers/room.controller';
import validation from '@/middleware/validation.middleware';
import roomValidation from '../validations/room.validation';

export class RoomRouter {
  private router = Router({ mergeParams: true });
  private _controller;

  constructor(controller: RoomController) {
    this._controller = controller;
    this.router.route('/').post(validation(roomValidation.create), controller.createRoom).get(controller.getAll);
  }

  public getRouter = (): Router => {
    return this.router;
  };
}

export default new RoomRouter(roomController).getRouter;
