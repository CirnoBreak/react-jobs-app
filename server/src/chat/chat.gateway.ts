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
    const { from, to, content } = data;
    const chatId = [from, to].sort().join('_');
    return this.chatService.saveChatData({ chatId, from , to, content })
      .then((res) => {
        client.emit('receiveMsg', res);
        client.broadcast.emit('receiveMsg', res);
      });
  }
}