import { ScoreItemI } from './ScoreItemI';
import { TeamI } from './TeamI';
import { Match } from './Match';

export interface MatchPredictionI extends Match, ScoreItemI {
  _id?: string
  selectedTeam?: TeamI;
  isCorrect?: boolean;
  homeTeamScore?: number;
  awayTeamScore?: number;
  points?: number;

  clear(teamIndexInNextMatch: number): void;
}

export class MatchPrediction {
  _id: string;
  selectedTeam?: TeamI;
  awayTeamScore?: number;
  homeTeamScore?: number;
}


