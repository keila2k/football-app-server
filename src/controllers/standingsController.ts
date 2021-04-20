import { NextFunction, Request, Response } from 'express';
import StandingsService from '../services/standingsService';
import { StandingI } from '../interfaces/StandingI';
import { ePrediction } from '../interfaces/ePrediction';

class StandingsController {
  public standingsService = new StandingsService();

  public getStandings = async (req: Request, res: Response, next: NextFunction) => {
    const ePredictionString: string = req.params.state;
    const ePredictionState: ePrediction = ePrediction[ePredictionString];
    try {
      if(!ePredictionState) throw new Error('No such ePrediction enum value');
      const leagueStandings: StandingI[] = await this.standingsService.findStandings(ePredictionState);
      res.status(200).json(leagueStandings);
    } catch (error) {
      next(error);
    }
  };

}

export default StandingsController;
