import { Document, model, Schema } from 'mongoose';
import { LeagueStandingsI } from '../interfaces/LeagueStandingsI';

const standingSchema: Schema = new Schema({
  standings: {
    type: ['Mixed'],
  },
  state: {
    type: 'String',
  },
});

const standingModel = model<LeagueStandingsI & Document>('LeagueStandingsI', standingSchema, 'standings');

export default standingModel;
