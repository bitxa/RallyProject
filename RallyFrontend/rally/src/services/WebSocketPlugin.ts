import { type InjectionKey, provide, inject } from "vue";
import { io, Socket } from "socket.io-client";

// Custom injection key
const SocketIOKey: InjectionKey<Socket> = Symbol("SocketClient");

// Socket.IO functionality
class SocketIOService {
  public socket: Socket;

  constructor(url: string) {
    this.socket = io(url);
  }
}
export function useSocketIO() {
  const socketService = new SocketIOService("ws://localhost:3001");
  return socketService;
}
