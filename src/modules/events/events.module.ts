import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WebSocketService } from './services/websocket.service';

@Module({
  providers: [EventsGateway, WebSocketService],
  exports:[],
  imports:[]
})
export class EventsModule {}