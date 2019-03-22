import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor (private chatService: ChatService) {}

  @SubscribeMessage('sendMsg')
  async sendMsg(client: Client, data: any) {
    // const a = await this.chatService.test({ chatId: '1', from: '2', to: '3', content: '4'})
    // console.log(a);
    return 'ok';
  }
}