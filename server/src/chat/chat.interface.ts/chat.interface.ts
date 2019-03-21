import { Document } from 'mongoose';
export interface ChatDto extends Document{
  readonly chatId: String;
  readonly from: String;
  readonly to: String;
  readonly read?: Boolean;
  readonly content: String;
  readonly createTime: Number;
}