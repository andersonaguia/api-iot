import { OnModuleInit } from '@nestjs/common';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { ConfigDataDto } from './dto/configData.dto';
import { RelayDataService } from '../relay-data/services/relay-data.service';
import { RelayDataEntity } from '../relay-data/entities/relay-data.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(private readonly relayDataService: RelayDataService){}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {}

  handleConnection(client: Socket) {
    console.log(
      `Client ${client.id} connected with EIO version: ${client.handshake.query.EIO}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  onModuleInit() {}

  @SubscribeMessage('events')
  findAll(@MessageBody() data: ConfigDataDto): Observable<WsResponse<RelayDataEntity[]>> {
    console.log(data);
/*
    this.server.emit('onConfigMessage', {
      msg: 'New Message',
      content: { id: 1, serialNumber: data.serialNumber, relay: 'Piscina', value: true },
    });
*/
    /*return from (this.relayDataService.findAllRelayStateByControllerId(50)).pipe(
      map((item) => ({ event: 'relayData', data: item })),
    );*/
    return
  }
}

