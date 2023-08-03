import { Router } from 'express';
import paymentController, { PaymentController } from '../controllers/payment.controller';
import authenticate from '@/middleware/authenticate.middleware';

class PaymentRouter {
  private router = Router();
  private _controller;

  constructor(controller: PaymentController) {
    this._controller = controller;
    this.router.route('/').get(authenticate, this._controller.create);
  }

  public getRouter = () => {
    return this.router;
  };
}

export default new PaymentRouter(paymentController).getRouter;
