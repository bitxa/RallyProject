/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway implements OnModuleInit {
  logger = new Logger('MessageLogger');

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`${socket.id} connected`);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log('New message: ' + JSON.stringify(body));

    this.server.emit('onMessage', {
      msg: 'NEW MESSAGE FROM SENSOR',
      content: body
    });
  }
}
