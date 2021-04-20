import standingModel from '../models/leagues.model';
import { StandingI } from '../interfaces/StandingI';
import { LeagueStandingsI } from '../interfaces/LeagueStandingsI';
import { ePrediction } from '../interfaces/ePrediction';

class StandingsService {
  public standings = standingModel;

  public async findStandings(ePredictionState: ePrediction): Promise<StandingI[]> {
    let find: LeagueStandingsI = await this.standings.findOne({ state: ePredictionState });
    if (find) {
      return find.standings;
    }
    return undefined;
  }
}

export default StandingsService;
