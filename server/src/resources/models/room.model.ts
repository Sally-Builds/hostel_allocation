import { Schema, model } from 'mongoose';
import IRoom from '../interfaces/room.interface';
import RankEnum from '../enums/rank';

const roomSchema = new Schema<IRoom>({
  hostel_id: {
    type: String,
    required: [true, 'Enter hostel associated with this room'],
  },
  room_number: {
    type: Number,
    required: [true, 'Enter room number'],
  },
  rank: {
    type: Number,
    enum: [RankEnum.last, RankEnum.middle, RankEnum.top],
  },
  isFull: {
    type: Boolean,
    default: false,
  },
  max_number_of_occupants: {
    type: Number,
    default: 4,
  },
  occupants: {
    type: [String],
  },
});

export default model('Room', roomSchema);
