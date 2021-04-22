import { NextFunction, Request, Response } from 'express';
import PredictionsService from '../services/predictions.service';
import { UserPredictionDtoI } from '../interfaces/UserPredictionDtoI';

class PredictionsController {
  public predictionService = new PredictionsService();

  public getPredictions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPredictionData: UserPredictionDtoI[] = await this.predictionService.findAllPredictions();
      res.status(200).json(findAllPredictionData);
    } catch (error) {
      next(error);
    }
  };

  public getPredictionByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.uid;

    try {
      const findOnePrediction: UserPredictionDtoI = await this.predictionService.findPredictionByUserId(userId);
      res.status(200).json(findOnePrediction);
    } catch (error) {
      next(error);
    }
  };

  public createPrediction = async (req: Request, res: Response, next: NextFunction) => {
    const predictionData: UserPredictionDtoI = req.body;

    try {
      const createPredictionData: UserPredictionDtoI = await this.predictionService.createPrediction(predictionData);
      res.status(201).json(createPredictionData);
    } catch (error) {
      next(error);
    }
  };

  public updatePrediction = async (req: Request, res: Response, next: NextFunction) => {
    const predictionId: string = req.params.id;
    const userPredictionDtoI: UserPredictionDtoI = req.body;

    try {
      const updatePredictionData: UserPredictionDtoI = await this.predictionService.updatePrediction(predictionId, userPredictionDtoI);
      res.status(200).json(updatePredictionData);
    } catch (error) {
      next(error);
    }
  };
}

export default PredictionsController;
