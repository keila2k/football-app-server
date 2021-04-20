import { StandingI } from './StandingI';
import { Match } from './Match';
import { UserPredictionDtoI } from './UserPredictionDtoI';

export class UserPredictionDto implements UserPredictionDtoI {
  _id?: string;
  standings: StandingI[];
  matches: Match[];
  uid: string;
}
