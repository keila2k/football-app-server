import { StandingI } from './StandingI';
import { MatchPredictionI } from './MatchPrediction';

export interface UserPredictionDtoI {
  _id?: string;
  standings?: StandingI[];
  matchScores?: MatchPredictionI[];
  finalsMatches?: MatchPredictionI[];
  uid: string
}
