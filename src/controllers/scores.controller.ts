import { NextFunction, Request, Response } from 'express';
import ScoreService from '../services/scores.service';
import { UserScoreDtoI } from '../interfaces/UserScoreDtoI';

class ScoresController {
  public scoreService = new ScoreService();

  public getScores = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllScoresData: UserScoreDtoI[] = await this.scoreService.findAllScores();
      res.status(200).json(findAllScoresData);
    } catch (error) {
      next(error);
    }
  };
}

export default ScoresController;
