import { StandingI } from './StandingI';
import { ePrediction } from './ePrediction';
import { LeagueStandingsI } from './LeagueStandingsI';

export class LeagueStandings implements LeagueStandingsI {
  standings: StandingI[];
  state: ePrediction;
}
