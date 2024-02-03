import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { SocketIoAdapter } from './core/adapters/socketIo/socket.adapters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;
  const SOCKET_PORT = configService.get<number>('socketPort') || 8001;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    }),
  );
  
  app.enableCors();

  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  await app.listen(PORT).then(() => {
    Logger.log(`Server is running on port ${PORT}`);
    Logger.log(`WebSocket is running on port ${SOCKET_PORT}`);
  });
}

bootstrap();
