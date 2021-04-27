import HttpException from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import predictionModel from '../models/predictions.model';
import { UserPredictionDtoI } from '../interfaces/UserPredictionDtoI';
import { MatchPrediction, MatchPredictionI } from '../interfaces/MatchPrediction';
import scoreModel from '../models/scores.model';
import { UserScoreDtoI } from '../interfaces/UserScoreDtoI';
import { LeagueStandingsI } from '../interfaces/LeagueStandingsI';
import { StandingI } from '../interfaces/StandingI';

class PredictionsService {
  public predictions = predictionModel;
  public scores = scoreModel;

  public async findAllPredictions(): Promise<UserPredictionDtoI[]> {
    return this.predictions.find();
  }

  public async findPredictionByUserId(userId: string): Promise<UserPredictionDtoI> {
    return this.predictions.findOne({ uid: userId });
  }

  public async createPrediction(predictionData: UserPredictionDtoI): Promise<UserPredictionDtoI> {
    if (isEmpty(predictionData)) throw new HttpException(400, 'You\'re not userData');

    const findPrediction: UserPredictionDtoI = await this.predictions.findOne({ uid: predictionData.uid });
    if (findPrediction) throw new HttpException(409, `You're user prediction already exists`);
    return await this.predictions.create(predictionData);
  }

  public async updatePrediction(predictionId: string, userPredictionDto: UserPredictionDtoI): Promise<UserPredictionDtoI> {
    if (isEmpty(userPredictionDto)) throw new HttpException(400, 'Empty userPredictionDto');
    const updatePredictionById: UserPredictionDtoI = await this.predictions.findByIdAndUpdate(predictionId, userPredictionDto);
    if (!updatePredictionById) throw new HttpException(409, 'Failed update');
    return updatePredictionById;
  }

  public async deletePredictionData(predictionId: string): Promise<UserPredictionDtoI> {
    const deletePredictionById: UserPredictionDtoI = await this.predictions.findByIdAndDelete(predictionId);
    if (!deletePredictionById) throw new HttpException(409, 'Failed delete');
    return deletePredictionById;
  }

  async onMatchEnd(matchPrediction: MatchPrediction) {
    const userPredictionDtos: UserPredictionDtoI[] = await this.predictions.find(async (err, userPredictionDtos) => {
      for (const userPredictionDto of userPredictionDtos) {
        const score = this.calculateScore(userPredictionDto, matchPrediction);
        if (score > 0) {
          await this.updateUserScore(userPredictionDto.uid, score);
        }
      }
    });
    return userPredictionDtos.map(value => value.uid);
  }

  private async updateUserScore(uid: string, score: number): Promise<UserScoreDtoI> {
    return this.scores.updateOne({ uid: uid }, { $inc: { score: score } });
  }

  private calculateScore(userPredictionDto: UserPredictionDtoI, matchPrediction: MatchPrediction): number {
    let score = 0;
    const selectedMatch = userPredictionDto.matchScores.find(match => matchPrediction._id === match._id);
    if (selectedMatch) {
      if (this.isScoreAccurate(selectedMatch, matchPrediction)) {
        score += 6;
      } else {
        if (this.isPartialScoreAccurate(selectedMatch, matchPrediction)) {
          score += 1;
        }
        if (this.isSelectedSideRight(selectedMatch, matchPrediction)) {
          score += 2;
        }
      }
    }
    return score;
  }

  private calculateStandingsScore(userPredictionDto: UserPredictionDtoI, leagueStandings: LeagueStandingsI): number {
    let score = 0;
    userPredictionDto.standings.forEach(userPredictionStanding => {
      let actualStanding: StandingI = leagueStandings.standings.find(leagueStanding => leagueStanding?.group?.groupName === userPredictionStanding.group.groupName);
      if (actualStanding) {
        score += this.calculateGroupScore(userPredictionStanding, actualStanding);
      }
    });
    return score;
  }

  private calculateGroupScore(userPredictionStanding: StandingI, actualStanding: StandingI) {
    let score = 0;
    for (let i = 0; i < userPredictionStanding.items.length; i++) {
      const userPredictionGroupItem = userPredictionStanding.items[i];
      const actualGroupItem = actualStanding.items[i];
      if (userPredictionGroupItem.rank == actualGroupItem?.rank &&
        userPredictionGroupItem.team.internationalName === actualGroupItem?.team.internationalName) {
        score += 2;
      }
    }
    return score;
  }

  private isSelectedSideRight(selectedMatch: MatchPredictionI, matchPrediction: MatchPrediction) {
    return selectedMatch.homeTeamScore > selectedMatch.awayTeamScore && matchPrediction.homeTeamScore > matchPrediction.awayTeamScore ||
      selectedMatch.homeTeamScore < selectedMatch.awayTeamScore && matchPrediction.homeTeamScore < matchPrediction.awayTeamScore ||
      selectedMatch.homeTeamScore === selectedMatch.awayTeamScore && matchPrediction.homeTeamScore === matchPrediction.awayTeamScore;
  }

  private isPartialScoreAccurate(selectedMatch: MatchPredictionI, matchPrediction: MatchPrediction) {
    return selectedMatch.homeTeamScore === matchPrediction.homeTeamScore || selectedMatch.awayTeamScore === matchPrediction.awayTeamScore;
  }

  private isScoreAccurate(selectedMatch: MatchPredictionI, matchPrediction: MatchPrediction) {
    return selectedMatch.homeTeamScore === matchPrediction.homeTeamScore && selectedMatch.awayTeamScore === matchPrediction.awayTeamScore;
  }

  async onStandingsEnd(leagueStandings: LeagueStandingsI) {
    const updatedUsers: String[] = [];
    try {
      const userPredictionDtos: UserPredictionDtoI[] = await this.predictions.find();
      for (const userPredictionDto of userPredictionDtos) {
        const score = this.calculateStandingsScore(userPredictionDto, leagueStandings);
        if (score > 0) {
          await this.updateUserScore(userPredictionDto.uid, score);
          updatedUsers.push(userPredictionDto.uid);
        }
      }
      return updatedUsers;
    } catch (e) {
      throw new HttpException(400, 'Error on standing end');
    }
  }
}

export default PredictionsService;
