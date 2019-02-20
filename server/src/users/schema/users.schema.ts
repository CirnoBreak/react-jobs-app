import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user: String,
  pwd: String,
  type: String,
  avatar: String,
  desc: String,
  title: String,
  company: String,
  money: String
});
