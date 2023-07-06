import IRoom from './room.interface';

export default interface IHostel {
  name: string;
  num_of_rooms: number;
  rank: number;
  rooms: IRoom[];
  total_occupants: number;
  gender: string;
  id: string;
}
