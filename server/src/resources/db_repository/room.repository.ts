import roomModel from '../models/room.model';
import HttpException from '@/utils/exceptions/httpExceptions';
import IRoom from '../interfaces/room.interface';

export default class RoomRepository {
  static async create(data: Partial<IRoom>): Promise<IRoom> {
    try {
      const room = await roomModel.create(data);

      return room;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  static async getAll(query: any): Promise<IRoom[]> {
    try {
      const rooms = await roomModel.find(query);

      return rooms;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  static async get(id: string): Promise<IRoom> {
    try {
      const room = await roomModel.findById(id);

      if (!room) throw new HttpException('not found', 404);

      return room;
    } catch (error: any) {
      throw new HttpException(error, error.statusCode | 500);
    }
  }

  static async update(id: string, data: Partial<IRoom>): Promise<IRoom> {
    try {
      const room = await roomModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });

      if (!room) throw new HttpException('not found', 404);

      return room;
    } catch (error: any) {
      throw new HttpException(error, error.statusCode | 500);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const room = await roomModel.findByIdAndDelete(id);

      if (!room) throw new HttpException('not found', 404);
    } catch (error: any) {
      throw new HttpException(error, error.statusCode | 500);
    }
  }
}
