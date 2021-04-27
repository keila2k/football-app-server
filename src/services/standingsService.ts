import standingModel from '../models/leagues.model';
import { StandingI } from '../interfaces/StandingI';
import { LeagueStandingsI } from '../interfaces/LeagueStandingsI';
import { ePrediction } from '../interfaces/ePrediction';
import HttpException from '../exceptions/HttpException';

class StandingsService {
  public standings = standingModel;

  public async findStandings(ePredictionState: ePrediction): Promise<StandingI[]> {
    let find: LeagueStandingsI = await this.standings.findOne({ state: ePredictionState });
    if (find) {
      return find.standings;
    }
    return undefined;
  }

  async onStandingsEnd(leagueStandings: LeagueStandingsI) {
    const finalLeagueStandings: LeagueStandingsI = await this.standings.findOne({ state: ePrediction.FINAL });
    if (finalLeagueStandings) {
      leagueStandings.standings.forEach(standing => {
          const finalStanding = finalLeagueStandings.standings.find(finalStandings => finalStandings.group.groupName === standing.group.groupName);
          for (let index = 0; index < standing.items.length; index++) {
            const groupItem = standing.items[index];
            let finalGroupItem = finalStanding.items[index];
            if (groupItem) {
              if (finalGroupItem) {
                throw new HttpException(400, 'Group item already defined');
              } else {
                finalStanding.items[index] = groupItem;
              }
            }
          }
        },
      );
      await this.standings.update({ _id: finalLeagueStandings._id }, finalLeagueStandings);
    }
  }
}

export default StandingsService;
