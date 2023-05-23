import { OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io-client';
export declare class SocketClient implements OnModuleInit {
    socketClient: Socket;
    clientID: string;
    constructor();
    onModuleInit(): void;
    emitTime(time: string): void;
    test(): void;
    consumeEvent(): void;
}
