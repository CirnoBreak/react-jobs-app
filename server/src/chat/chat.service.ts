import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './interface/chat.interface';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async saveChatData (data: ChatDto) {
    const createChat = new this.chatModel(data);
    return await createChat.save();
  }

  async findUserMsg (_id: string) {
    const queryCondition = {
      '$or': [{
        from: _id
      }, {
        to: _id
      }]
    };
    return await this.chatModel.find(queryCondition);
  }

  async updateRead (opt: Object) {
    return await this.chatModel.update(opt, { read: true}, { multi: true });
  }
}