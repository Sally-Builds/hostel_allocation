import paymentModel from '../models/payment.model';
import HttpException from '@/utils/exceptions/httpExceptions';
import IPayment from '../interfaces/payment.interface';

export default class PaymentRepository {
  static async create(data: IPayment): Promise<IPayment> {
    try {
      const payment = await paymentModel.create(data);

      return payment;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}
