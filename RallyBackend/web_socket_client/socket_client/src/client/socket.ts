import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

Injectable();
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  public clientID: string;

  constructor() {
    this.socketClient = io('http://localhost:3000');
  }

  onModuleInit() {
    this.consumeEvent();
    this.test();
    this.clientID = '01';
  }

  emitTime(time: string) {
    this.socketClient.emit('newMessage', {
      id: this.clientID,
      time: time,
    });
  }

  test() {
    setInterval(() => {
      const now = new Date();
      this.emitTime(
        now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      );
    }, 2000);
  }

  consumeEvent() {
    this.socketClient.on('connect', () => {
      console.log('Connected to gateway');
    });

    this.socketClient.on('onMessage', (payload: any) => {
      console.log('Received message from gateway' + payload.id);
      console.log(payload);
    });
  }
}
