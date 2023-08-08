import HostelRepository from '../db_repository/hostel.repository';
import HttpException from '@/utils/exceptions/httpExceptions';
import IHostel from '../interfaces/hostel.interface';
// import IRoom from '../interfaces/room.interface';
import GenderEnum from '../enums/gender';
import RankEnum from '../enums/rank';
import RoomRepository from '../db_repository/room.repository';
import UserRepository from '../db_repository/user.repository';

export default class HostelService {
  public create = async (name: string, gender: string, max_rooms: number): Promise<IHostel> => {
    try {
      const data: Pick<IHostel, 'gender' | 'name' | 'max_rooms'> = {
        name,
        gender: GenderEnum[0] == gender ? 'male' : 'female',
        max_rooms,
      };
      const hostel = await HostelRepository.create(data);
      return hostel;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getById = async (id: string): Promise<IHostel> => {
    try {
      const hostel = await HostelRepository.getById(id);

      if (!hostel) throw new HttpException('not found', 404);

      return hostel;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getByName = async (name: string): Promise<IHostel> => {
    try {
      const hostel = await HostelRepository.getByName(name);

      if (!hostel) throw new HttpException('not found', 404);

      return hostel;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getAllHostels = async (query: Partial<IHostel>): Promise<IHostel[]> => {
    try {
      const hostels = await HostelRepository.getAll(query);

      return hostels;
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

  public assignHostel = async (gender: string, userId: string) => {
    try {
      const hostels = await HostelRepository.getAll({ gender: gender });
      let hostelId;
      let roomId;
      let roomIndex;
      let hostelIndex;
      if (hostels.length == 0) throw new HttpException('hostel allocation not started', 400);

      for (let i = 0; i < hostels.length; i++) {
        hostels[i].rooms.sort((a, b) => (a.rank > b.rank ? -1 : 1));
      }

      for (let i = 0; i < hostels.length; i++) {
        for (let j = 0; j < hostels[i].rooms.length; j++) {
          if (hostels[i].rooms[j].occupants.length <= hostels[i].rooms[j].max_number_of_occupants) {
            hostels[i].rooms[j].occupants.push(userId);
            hostelId = hostels[i].id;
            roomId = hostels[i].rooms[j].id;
            roomIndex = j;
            hostelIndex = i;
            break;
          }
        }
      }

      if (hostelId) {
        await HostelRepository.update(hostelId, { $inc: { total_occupants: 1 } });
      }
      if (roomId) {
        await RoomRepository.update(roomId, { occupants: hostels[hostelIndex].rooms[roomIndex].occupants });
      }
      if (hostelId) {
        await UserRepository.update(userId, { hostel_allocated: hostelId, room_allocated: roomId });
      }

      if (!hostelId) {
        throw new HttpException('All Hostel are full', 400);
      }
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };
}
