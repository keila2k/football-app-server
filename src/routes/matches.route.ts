import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import MatchesController from '../controllers/matches.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { MatchPrediction } from '../interfaces/MatchPrediction';

class MatchesRoute implements Route {
  public path = '/matches';
  public router = Router();
  public matchesController = new MatchesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.matchesController.getAllMatches);
    this.router.get(`${this.path}/:stage`, this.matchesController.getMatches);
    this.router.post(`${this.path}`, this.matchesController.addMatches);
    this.router.post(`${this.path}/match-end`, validationMiddleware(MatchPrediction, 'body'), this.matchesController.onMatchEnd);
  }
}

export default MatchesRoute;
