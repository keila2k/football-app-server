import { Document, model, Schema } from 'mongoose';
import { UserDetails } from '../interfaces/user-details.interface';

const userDetailsSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const userDetailsModel = model<UserDetails & Document>('UserDetails', userDetailsSchema);

export default userDetailsModel;
