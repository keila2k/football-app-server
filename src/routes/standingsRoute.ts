import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import StandingsController from '../controllers/standingsController';
import validationMiddleware from '../middlewares/validation.middleware';
import { LeagueStandings } from '../interfaces/LeagueStandings';

class StandingsRoute implements Route {
  public path = '/standings';
  public router = Router();
  public standingsController = new StandingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:state`, this.standingsController.getStandings);
    this.router.post(`${this.path}/standings-end`, validationMiddleware(LeagueStandings, 'body'), this.standingsController.onStandingsEnd);
    // this.router.get(`${this.path}/:id`, this.standingsController.getPredictionByUserId);
    // this.router.post(`${this.path}`, validationMiddleware(Prediction, 'body'), this.standingsController.createPrediction);
    // this.router.put(`${this.path}/:id`, validationMiddleware(Prediction, 'body', true), this.standingsController.updatePrediction);
  }
}

export default StandingsRoute;
