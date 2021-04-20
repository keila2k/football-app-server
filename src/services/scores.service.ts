import scoreModel from '../models/scores.model';

class ScoreService {
  public scores = scoreModel;

  async findAllScores() {
    return this.scores.aggregate([
      {
        $lookup:{
          from: "userdetails",
          localField: "uid",
          foreignField: "uid",
          as: "user_details"
        }
      },
      {   $unwind:"$user_details" },
      {
        $project:{
          _id : 0,
          score: 1,
          uid: 1,
          name : "$user_details.name",
          img : "$user_details.img",
        }
      },
      { $sort : { score : -1 } }
    ])
  }
}

export default ScoreService;
