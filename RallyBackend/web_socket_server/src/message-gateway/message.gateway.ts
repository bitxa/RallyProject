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
    // body.time must have ISO 8601 format
    const [hours, minutes, seconds, milliseconds] = body.time.split(/:|\./);

    //(HH:MM:SS:MSS)
    const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;

    console.log('COLLECTED MESSAGE');
    console.log(`from: ${body.id}`);
    console.log(`time: ${formattedTime}`);
    this.server.emit('onMessage', {
      id: body.id,
      time: formattedTime,
    });
  }
}
