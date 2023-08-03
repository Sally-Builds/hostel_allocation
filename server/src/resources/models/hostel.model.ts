import { Schema, model } from 'mongoose';
import IHostel from '../interfaces/hostel.interface';
import GenderEnum from '../enums/gender';

const hostelSchema = new Schema<IHostel>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Enter Hostel name'],
  },
  num_of_rooms: {
    type: Number,
    default: 0,
  },
  max_rooms: {
    type: Number,
    default: 3,
  },
  total_occupants: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: [GenderEnum[0], GenderEnum[1]],
  },
});

export default model('Hostel', hostelSchema);
