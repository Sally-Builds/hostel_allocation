import HostelRepository from '../db_repository/hostel.repository';
import HttpException from '@/utils/exceptions/httpExceptions';
import IHostel from '../interfaces/hostel.interface';
import GenderEnum from '../enums/gender';

export default class HostelService {
  public create = async (name: string, gender: string): Promise<IHostel> => {
    try {
      const data: Pick<IHostel, 'gender' | 'name'> = {
        name,
        gender: GenderEnum[0] == gender ? 'male' : 'female',
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
}
