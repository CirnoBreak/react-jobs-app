import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    required: true,
    default: ''
  },
  createTime: {
    type: Number,
    default: Date.now
  }
});