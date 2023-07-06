import { Schema, model } from 'mongoose';
import IHostel from '../interfaces/hostel.interface';
import GenderEnum from '../enums/gender';
import RankEnum from '../enums/rank';

const hostelSchema = new Schema<IHostel>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Enter Hostel name'],
  },
  rank: {
    type: Number,
    enum: [RankEnum.last, RankEnum.middle, RankEnum.top],
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
