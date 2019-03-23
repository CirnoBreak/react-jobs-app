import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]), UsersModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, UsersService]
})
export class ChatModule {}