import { Document, model, Schema } from 'mongoose';
import { Match } from '../interfaces/Match';

const matchSchema: Schema = new Schema({
  awayTeam: {
    internationalName: {
      type: 'String',
    },
    logoUrl: {
      type: 'String',
    },
    teamCode: {
      type: 'String',
    },
  },
  homeTeam: {
    internationalName: {
      type: 'String',
    },
    logoUrl: {
      type: 'String',
    },
    teamCode: {
      type: 'String',
    },
  },
  kickOffTime: {
    dateTime: {
      type: 'Date',
    },
    utcOffsetInHours: {
      type: 'Number',
    },
  },
  matchNumber: {
    type: 'Number',
  },
  stage: {
    type: 'String',
  },
});

const matchModel = model<Match & Document>('Match', matchSchema);

export default matchModel;
