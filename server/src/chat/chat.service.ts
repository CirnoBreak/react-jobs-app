import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './interface/chat.interface';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async test (data: ChatDto) {
    const createChat = new this.chatModel(data);
    return await createChat.save();
  }
}