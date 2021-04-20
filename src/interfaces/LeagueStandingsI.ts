import { StandingI } from './StandingI';
import { ePrediction } from './ePrediction';

export interface LeagueStandingsI {
  _id?: string
  standings: StandingI[],
  state: ePrediction
}
