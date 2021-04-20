import { StandingI } from './StandingI';
import { Match } from './Match';

export interface UserPredictionDtoI {
  _id?: string;
  standings: StandingI[];
  matches: Match[];
  uid: string
}
