import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

Injectable();
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  public clientID: string;

  constructor() {
    this.socketClient = io('ws://localhost:3001');
  }

  onModuleInit() {
    this.consumeEvent();
    this.test();
    this.clientID = 'entrada';
  }

  emitTime(time: string) {
    this.socketClient.emit('newMessage', {
      id: this.clientID,
      time: time,
    });
  }

  test() {
    setInterval(() => {
      // example: 2023-06-02T12:15:23.293Z
      const currentTime = new Date().toISOString();
      const timeString = currentTime.split('T')[1].slice(0, -1);

      this.emitTime(timeString);
    }, 10000);
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
