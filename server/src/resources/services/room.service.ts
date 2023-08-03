import RoomRepository from '../db_repository/room.repository';
import IRoom from '../interfaces/room.interface';
import HttpException from '@/utils/exceptions/httpExceptions';
import RankEnum from '../enums/rank';
import HostelRepository from '../db_repository/hostel.repository';

export default class RoomService {
  public createRoom = async (room_number: number, rank: string, hostel_id: string): Promise<IRoom> => {
    try {
      const hostel = await HostelRepository.getById(hostel_id);
      if (!hostel) throw new HttpException('hostel does not exist', 404);

      const roomsCreated = await RoomRepository.getAll({ hostel_id });

      if (roomsCreated.length >= hostel.max_rooms) {
        throw new HttpException('maximum room already created for this hostel', 400);
      }

      if (await RoomRepository.getOne({ room_number })) throw new HttpException('room number already registered', 400);

      const data: Partial<IRoom> = {
        room_number,
        rank: this.convertRank(rank),
        hostel_id,
      };
      const room = await RoomRepository.create(data);

      return room;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getRooms = async (query: any): Promise<IRoom[]> => {
    try {
      const rooms = await RoomRepository.getAll(query);

      return rooms;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getRoom = async (id: string): Promise<IRoom> => {
    try {
      const room = await RoomRepository.get(id);

      return room;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  private convertRank = (rank: string) => {
    let numRank;
    if (rank == RankEnum[0]) {
      numRank = 0;
    } else if (rank == RankEnum[1]) {
      numRank = 1;
    } else {
      numRank = 2;
    }
    return numRank;
  };
}
