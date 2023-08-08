export default interface IRoom {
  hostel_id: string;
  room_number: number;
  rank: number;
  isFull: boolean;
  max_number_of_occupants: number;
  id: string;
  occupants: string[];
}
