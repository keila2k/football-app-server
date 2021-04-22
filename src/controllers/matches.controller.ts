import { NextFunction, Request, Response } from 'express';
import { Match } from '../interfaces/Match';
import MatchesService from '../services/matches.service';
import { eMatchStage } from '../interfaces/eMatchStage';
import { MatchPrediction } from '../interfaces/MatchPrediction';
import PredictionsService from '../services/predictions.service';

class MatchesController {
  public matchService = new MatchesService();
  public predictionsService = new PredictionsService();

  public getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    const matches: Match[] = await this.matchService.findMatches();
    res.status(200).json(matches);
  };

  public onMatchEnd = async (req: Request, res: Response, next: NextFunction) => {
    const matchPrediction: MatchPrediction = req.body;
    try {
      const updatedUsers: string[] = await this.predictionsService.onMatchEnd(matchPrediction);
      res.status(201).json(updatedUsers);
    } catch (error) {
      next(error);
    }

  };
  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    const eStageString: string = req.params.stage;
    const eStageValue: eMatchStage = eMatchStage[eStageString];
    try {
      if (!eStageValue) throw new Error('No such ePrediction enum value');
      const matches: Match[] = await this.matchService.findMatches(eStageValue);
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public addMatches = async (req: Request, res: Response, next: NextFunction) => {
    const matches: Match[] = req.body;

    try {
      const addedMatches: Match[] = await this.matchService.addMatches(matches);
      res.status(201).json(addedMatches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
