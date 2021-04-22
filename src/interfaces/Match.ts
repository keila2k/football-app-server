import { TeamI } from './TeamI';
import { DateTimeI } from './DateTimeI';
import { eMatchStage } from './eMatchStage';

export interface Match {
  homeTeam: TeamI;
  awayTeam: TeamI;
  matchNumber: number;
  kickOffTime: DateTimeI
  stage: eMatchStage
}
