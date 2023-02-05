/* eslint-disable */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  async handleConnection(client: any) {
    this.server.emit('new-connect', client.id);
  }

  async handleDisconnect(client: any) {
    console.log('Client disconnected: ', client.id);
  }

  async sendMessage(client: any, message: any) {
    client.emit('message', message);
  }

  @SubscribeMessage('send-message')
  async handleMessage(client: any, message: any) {
    // this.server.emit('new-message', message);
    client.emit('new-message', message);
  }
}
