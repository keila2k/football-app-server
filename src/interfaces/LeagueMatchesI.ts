import { Match } from './Match';

export interface LeagueMatchesI {
  _id?: string
  groupsMatches: Match[],
  finalsMatches: Match[]
}
