import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import GeneralController from '../controllers/general.controller';

class GeneralRoute implements Route {
  public path = '/general';
  public router = Router();
  public generalController = new GeneralController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.generalController.getGeneral);
  }
}

export default GeneralRoute;
