export default interface IRoom {
  hostel_id: string;
  room_number: number;
  rank: number;
  isFull: boolean;
  occupants: string[];
  id: string;
}
