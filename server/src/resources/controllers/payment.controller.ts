import { Request, Response, NextFunction } from 'express';
import PaymentService from '../services/payment.service';
import HttpException from '@/utils/exceptions/httpExceptions';

export class PaymentController {
  private _service;

  constructor(service: PaymentService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payment = await this._service.create(req.user.id, req.body.receipt_number);

      res.status(201).json(payment);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
}

export default new PaymentController(new PaymentService());
