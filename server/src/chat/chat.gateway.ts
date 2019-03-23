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
    // const result = await this.chatService.saveChatData(data);
    console.log(data);
    // return {hehe: true}
    // if (result) {
    client.emit('receiveMsg', {asdf: 'sdf'});
    // }
  }
}