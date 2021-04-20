import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import ScoresController from '../controllers/scores.controller';

class ScoresRoute implements Route {
  public path = '/scores';
  public router = Router();
  public scoresController = new ScoresController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.scoresController.getScores);
  }
}

export default ScoresRoute;
