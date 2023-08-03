import IPayment from '../interfaces/payment.interface';
import PaymentRepository from '../db_repository/payment.repository';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class PaymentService {
  public create = async (user_id: string, receipt_number: string): Promise<IPayment> => {
    try {
      const data: IPayment = {
        user_id,
        date_issued: new Date(),
        receipt: receipt_number,
      };
      const payment = await PaymentRepository.create(data);

      return payment;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };
}
