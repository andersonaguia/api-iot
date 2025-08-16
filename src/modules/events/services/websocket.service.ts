import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { WebSocketServer, WebSocket } from 'ws';
import { EventsGateway } from '../events.gateway';

@Injectable()
export class WebSocketService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(forwardRef(() => EventsGateway))
    private readonly eventsGateway: EventsGateway) {}
  private wss: WebSocketServer;

  onModuleInit() {
    const WebSocket = require('ws');
    this.wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log(`Client connected with WebSocket`);

      ws.onmessage = (event) => {
        //console.log('Received message: %s', event.data);
        // Process the message or broadcast to other clients
        //ws.send(`Server received: ${event.data}`);
        this.broadcast(event.data);
        this.eventsGateway.sendSocketIoMessage(JSON.parse(event.data));
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });

    Logger.log(`WebSocket is running on port ${process.env.WEBSOCKET_PORT}`);
  }

  sendWebSocketMessage(data: { from: string; to: string; message: string }) {
    this.broadcast(JSON.stringify(data));
  }

  onModuleDestroy() {
    this.wss.close();
  }

  private broadcast(message: string) {
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
