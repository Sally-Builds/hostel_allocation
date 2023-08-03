import { Schema, model } from 'mongoose';
import IPayment from '../interfaces/payment.interface';

export default model(
  'Payment',
  new Schema<IPayment>({
    user_id: {
      type: String,
      required: [true, 'user making this payment'],
    },
    date_issued: {
      type: Date,
      default: Date.now(),
    },
    receipt: {
      type: String,
      required: [true, 'receipt number of payment'],
    },
  }),
);
