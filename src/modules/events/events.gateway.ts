import { OnModuleInit } from '@nestjs/common';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { RelayDataEntity } from '../relay-data/entities/relay-data.entity';
import { WebSocketService } from './services/websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(private readonly websocketService: WebSocketService) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {}

  handleConnection(client: Socket) {
    console.log(
      `Client ${client.id} connected with SocketIO EIO ${client.handshake.query.EIO}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  onModuleInit() {}

  @SubscribeMessage('fitness')
  findAll(
    @MessageBody() data: { from: string; to: string; message: string },
  ): Observable<WsResponse<RelayDataEntity[]>> {
    //console.log(data);

    this.server.emit('fitnessBt', data);

    this.websocketService.sendWebSocketMessage(data);

    return;
  }

  sendSocketIoMessage(data: { from: string; to: string; message: string }) {
    //console.log("ENVIANDO SOCKETIO: ", data)
    this.server.emit('fitnessBt', data);
  }
}
