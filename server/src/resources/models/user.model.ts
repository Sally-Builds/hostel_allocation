import { Schema, model } from 'mongoose';
import IUser from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'You must have name'] },
  reg_no: { type: String },
  department: { type: String },
  gender: { type: String },
  password: { type: String, required: [true, 'password is required'] },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student',
  },
  room_allocated: {
    type: String,
  },
  hostel_allocated: {
    type: String,
  },
});

export default model('User', userSchema);
