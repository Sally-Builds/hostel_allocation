import IPayment from '../interfaces/payment.interface';
import PaymentRepository from '../db_repository/payment.repository';
import HttpException from '@/utils/exceptions/httpExceptions';
import HostelService from './hostel.service';
import IUser from '../interfaces/user.interface';

export default class PaymentService {
  public create = async (user: IUser, receipt_number: string): Promise<IPayment> => {
    if (user.hostel_allocated) {
      throw new HttpException('You have already been assigned a hostel', 400);
    }
    try {
      const data: IPayment = {
        user_id: user.id,
        date_issued: new Date(),
        receipt: receipt_number,
      };
      const payment = await PaymentRepository.create(data);
      new HostelService().assignHostel(user.gender, user.id);
      return payment;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };
}
