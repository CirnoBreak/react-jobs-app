import {
  Controller,
  Get,
  Post,
  Response,
  Body,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { User } from 'src/shared/users.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService, private readonly usersService: UsersService) {}

  @Get('/msgList')
  async getMsgList (@User('_id') _id: string) {
    console.log('sldfikj');
    const usersList = await this.usersService.findUsers();
    console.log(usersList[0].username, usersList[0]);
    if (usersList) {
      let usersMap = {};
      usersList.map((user) => {
        usersMap[user._id] = {
          username: user.username,
          avatar: user.avatar || ''
        }
      });
      const msgList = await this.chatService.findUserMsg(_id);
      // if (msgList) {
      //   return response
      //     .json({ msgList, users: usersMap, status: HttpStatus.OK });
      // }
      // return response.json({ msg: '错误', status: HttpStatus.BAD_GATEWAY });
    }
    // return response.json({ msg: '错误', status: HttpStatus.BAD_GATEWAY });
  }

  @Post('/read')
  async markRead (@User('_id') _id: string, @Body() chatData: ChatDto, @Response() response) {
    const { from } = chatData;
    const to = _id;
    const result = await this.chatService.updateRead({ from, to, read: false});
    console.log(result);
  }
}