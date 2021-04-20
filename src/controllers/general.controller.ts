import { NextFunction, Request, Response } from 'express';
import GeneralService from '../services/generalService';
import { GeneralDtoI } from '../interfaces/GeneralDtoI';

class GeneralController {
  public generalService = new GeneralService();

  public getGeneral = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const generalDtoI: GeneralDtoI = await this.generalService.getGeneral();
      res.status(200).json(generalDtoI);
    } catch (error) {
      next(error);
    }
  };
}

export default GeneralController;
