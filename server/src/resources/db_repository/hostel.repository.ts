import hostelModel from '../models/hostel.model';
import IHostel from '../interfaces/hostel.interface';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class HostelRepository {
  /**
   *
   * @param data Hostel data to commit to db
   * @returns newly created hostel
   */
  static async create(data: Pick<IHostel, 'gender' | 'name'>): Promise<IHostel> {
    try {
      const hostel = await hostelModel.create(data);

      return hostel;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param query filter query
   * @returns filtered query or all data in db
   */
  static async getAll(query: any): Promise<IHostel[]> {
    try {
      const hostels = await hostelModel.find(query);

      return hostels;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param name - name of hostel
   * @returns matched hostel
   */
  static async getByName(name: string): Promise<IHostel | null> {
    try {
      const hostel = await hostelModel.findOne({ name });

      return hostel;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id id of hostel
   * @returns matched hostel id
   */
  static async getById(id: string): Promise<IHostel | null> {
    try {
      const hostel = await hostelModel.findOne({ id });

      return hostel;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id hostel id
   * @param data update
   * @returns updated hostel data
   */
  static async update(id: string, data: Partial<IHostel>): Promise<IHostel | null> {
    try {
      const hostel = await hostelModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

      return hostel;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id hostel id
   */
  static async delete(id: string): Promise<void> {
    try {
      const hostel = await hostelModel.findByIdAndDelete(id);

      if (!hostel) throw new HttpException('not found', 404);
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}
