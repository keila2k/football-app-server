import { Document, model, Schema } from 'mongoose';
import { GeneralDtoI } from '../interfaces/GeneralDtoI';

const generalSchema: Schema = new Schema({
  isPredictionsEnabled: {
    type: 'Boolean',
    required: true,
  },
  isKnockoutsEnabled: {
    type: 'Boolean',
    required: true,
  },
});

const generalModel = model<GeneralDtoI & Document>('GeneralDtoI', generalSchema, 'general');

export default generalModel;
