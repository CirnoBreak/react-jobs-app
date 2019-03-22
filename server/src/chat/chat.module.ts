import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}