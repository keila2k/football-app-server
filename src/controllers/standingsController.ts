import { NextFunction, Request, Response } from 'express';
import StandingsService from '../services/standingsService';
import { StandingI } from '../interfaces/StandingI';
import { ePrediction } from '../interfaces/ePrediction';
import { LeagueStandingsI } from '../interfaces/LeagueStandingsI';
import PredictionsService from '../services/predictions.service';

class StandingsController {
  public predictionsService = new PredictionsService();
  public standingsService = new StandingsService();

  public getStandings = async (req: Request, res: Response, next: NextFunction) => {
    const ePredictionString: string = req.params.state;
    const ePredictionState: ePrediction = ePrediction[ePredictionString];
    try {
      if (!ePredictionState) throw new Error('No such ePrediction enum value');
      const leagueStandings: StandingI[] = await this.standingsService.findStandings(ePredictionState);
      res.status(200).json(leagueStandings);
    } catch (error) {
      next(error);
    }
  };

  onStandingsEnd = async (req: Request, res: Response, next: NextFunction) => {
    const leagueStandings: LeagueStandingsI = req.body;
    try {
      await this.standingsService.onStandingsEnd(leagueStandings);
      const updatedUsers: String[] = await this.predictionsService.onStandingsEnd(leagueStandings);
      res.status(201).json(updatedUsers);
    } catch (error) {
      next(error);
    }
  };
}

export default StandingsController;
