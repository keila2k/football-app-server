import { Document, model, Schema } from 'mongoose';
import { UserScoreDtoI } from '../interfaces/UserScoreDtoI';

const scoreSchema: Schema = new Schema({
  score: {
    type: 'Number',
    required: true
  },
  uid: {
    type: 'String',
    required: true,
    unique: true
  }
});

const scoreModel = model<UserScoreDtoI & Document>('UserScoreDtoI', scoreSchema, 'scores');

export default scoreModel;
