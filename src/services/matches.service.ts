import HttpException from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import { Match } from '../interfaces/Match';
import matchModel from '../models/matches.model';
import { eMatchStage } from '../interfaces/eMatchStage';

class MatchesService {
  public matches = matchModel;

  public async findMatches(eStage?: eMatchStage): Promise<Match[]> {
    return this.matches.find(eStage && { stage: eStage }).sort('matchNumber');
  }

  public async addMatches(matches: Match[]): Promise<Match[]> {
    if (isEmpty(matches)) throw new HttpException(400, 'matches are empty');
    return await this.matches.create(matches);
  }
}

export default MatchesService;
