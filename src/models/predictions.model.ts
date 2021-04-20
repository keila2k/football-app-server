import { Document, model, Schema } from 'mongoose';
import { UserPredictionDtoI } from '../interfaces/UserPredictionDtoI';

const predictionSchema: Schema = new Schema({
  standings: {
    type: ['Mixed'],
  },
  matches: {
    type: ['Mixed'],
  },
  uid: {
    type: 'String',
  },
});

const predictionModel = model<UserPredictionDtoI & Document>('UserPredictionDtoI', predictionSchema, 'predictions');

export default predictionModel;
