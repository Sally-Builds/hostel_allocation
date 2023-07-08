/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express';
import RoomService from '../services/room.service';
import HttpException from '@/utils/exceptions/httpExceptions';

export class RoomController {
  private _service;

  constructor(service: RoomService) {
    this._service = service;
  }

  public createRoom = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { hostel_id } = req.params;

      if (!hostel_id) throw new HttpException('provide the hostel this room is associated with.', 400);

      const { room_number, rank } = req.body;
      const room = await this._service.createRoom(room_number, rank, hostel_id);

      res.status(201).json(room);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      let query: any = {};

      if (req.params.hostel_id) query.hostel_id = req.params.hostel_id;

      if (Object.keys(req.query).length != 0) {
        query = req.query;
      }
      const rooms = await this._service.getRooms(query);

      res.status(201).json({ results_length: rooms.length, rooms });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  public get = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const room = await this._service.getRoom(req.params.id);

      res.status(201).json(room);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
}

export default new RoomController(new RoomService());
