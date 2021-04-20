import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import PredictionsController from '../controllers/predictions.controller';
import { UserPredictionDto } from '../interfaces/UserPredictionDto';

class PredictionsRoute implements Route {
  public path = '/predictions';
  public router = Router();
  public predictionsController = new PredictionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.predictionsController.getPredictions);
    this.router.get(`${this.path}/:uid`, this.predictionsController.getPredictionByUserId);
    this.router.post(`${this.path}`, validationMiddleware(UserPredictionDto, 'body'), this.predictionsController.createPrediction);
    this.router.put(`${this.path}/:id`, validationMiddleware(UserPredictionDto, 'body', true), this.predictionsController.updatePrediction);
  }
}

export default PredictionsRoute;
