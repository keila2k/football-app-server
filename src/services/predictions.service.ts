import HttpException from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import predictionModel from '../models/predictions.model';
import { UserPredictionDtoI } from '../interfaces/UserPredictionDtoI';

class PredictionsService {
  public predictions = predictionModel;

  public async findAllPredictions(): Promise<UserPredictionDtoI[]> {
    return this.predictions.find();
  }

  public async findPredictionByUserId(userId: string): Promise<UserPredictionDtoI> {
    return this.predictions.findOne({ uid: userId });
  }

  public async createPrediction(predictionData: UserPredictionDtoI): Promise<UserPredictionDtoI> {
    if (isEmpty(predictionData)) throw new HttpException(400, "You're not userData");

    const findPrediction: UserPredictionDtoI = await this.predictions.findOne({ uid: predictionData.uid });
    if (findPrediction) throw new HttpException(409, `You're user prediction already exists`);
    return await this.predictions.create(predictionData);
  }

  public async updatePrediction(predictionId: string, predictionData: UserPredictionDtoI): Promise<UserPredictionDtoI> {
    if (isEmpty(predictionData)) throw new HttpException(400, "Empty predictionData");
    const updatePredictionById: UserPredictionDtoI = await this.predictions.findByIdAndUpdate(predictionId, predictionData);
    if (!updatePredictionById) throw new HttpException(409, "Failed update");
    return updatePredictionById;
  }

  public async deletePredictionData(predictionId: string): Promise<UserPredictionDtoI> {
    const deletePredictionById: UserPredictionDtoI = await this.predictions.findByIdAndDelete(predictionId);
    if (!deletePredictionById) throw new HttpException(409, "Failed delete");
    return deletePredictionById;
  }
}

export default PredictionsService;
