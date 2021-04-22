import { StandingI } from './StandingI';
import { UserPredictionDtoI } from './UserPredictionDtoI';
import { MatchPredictionI } from './MatchPrediction';

export class UserPredictionDto implements UserPredictionDtoI {
  _id?: string;
  standings?: StandingI[];
  matchScores?: MatchPredictionI[];
  finalsMatches?: MatchPredictionI[];
  uid: string
}
