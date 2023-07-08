import { Request, Response, NextFunction } from 'express';
import HostelService from '../services/hostel.service';
import HttpException from '@/utils/exceptions/httpExceptions';

export class HostelController {
  private _service;

  constructor(service: HostelService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, gender, rank } = req.body;
      const hostel = await this._service.create(name, gender, rank);

      res.status(201).json({ hostel });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const hostels = await this._service.getAllHostels(req.query);

      res.status(201).json({ result_length: hostels.length, hostels });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
}

export default new HostelController(new HostelService());
