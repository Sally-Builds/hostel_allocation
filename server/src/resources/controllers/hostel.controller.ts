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
      const { name, gender } = req.body;
      const hostel = await this._service.create(name, gender);

      res.status(201).json({ hostel });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
  // public create = (req: Request, res:Response, next: NextFunction): Promise<Response | void> {}
}

export default new HostelController(new HostelService());
