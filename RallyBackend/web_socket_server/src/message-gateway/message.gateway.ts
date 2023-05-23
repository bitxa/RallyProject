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

@WebSocketGateway({
  //? solo para pruebas
  cors: {
    origin: '*',
  },
})
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
    console.log('COLLECTED MESSAGE');
    console.log(`from: ${body.id}`);
    console.log(`time: ${body.time}`);
    this.server.emit('onMessage', {
      id: body.id,
      time: body.time,
    });
  }
}
