import HostelRepository from '../db_repository/hostel.repository';
import HttpException from '@/utils/exceptions/httpExceptions';
import IHostel from '../interfaces/hostel.interface';
import GenderEnum from '../enums/gender';
import RankEnum from '../enums/rank';

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
}
