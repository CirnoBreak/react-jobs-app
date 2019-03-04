import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  avatar: String,
  desc: String,
  position: String,
  company: String,
  money: String
});
