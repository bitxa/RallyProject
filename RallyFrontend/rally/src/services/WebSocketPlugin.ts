import { type InjectionKey, provide, inject } from "vue";
import { io, Socket } from "socket.io-client";

// Custom injection key
const SocketIOKey: InjectionKey<Socket> = Symbol("SocketClient");

// Socket.IO functionality
class SocketIOService {
  public socket: Socket;
  /*
this.socket.on("connect", () => {
      console.log("Connected to Socket server");
    });

    this.socket.on("onMessage", (data: any) => {
      console.log("Received message:", data);
    });
    */
  constructor(url: string) {
    this.socket = io(url);
  }
}

// Provide the Socket.IO instance using the custom injection key
export function provideSocketIO(url: string) {
  const socketIO = new SocketIOService(url);
  provide(SocketIOKey, socketIO.socket);
}

// Inject the Socket.IO instance in components
export function useSocketIO() {
  const socketService = new SocketIOService("ws://localhost:3001");
  return socketService;
}
