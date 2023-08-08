import IRoom from './room.interface';

export default interface IHostel {
  name: string;
  max_rooms: number;
  num_of_rooms: number;
  rooms: IRoom[];
  gender: string;
  total_occupants: number;
  id: string;
}
