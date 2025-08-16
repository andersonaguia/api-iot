import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { SocketIoAdapter } from './core/adapters/socketIo/socket.adapters';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './core/database/data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;
  const SOCKETIO_PORT = configService.get<number>('socketIoPort') || 8001;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    }),
  );
  
  app.enableCors();

  // --- Rodando migrations antes do listen ---
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  Logger.log('Database connected, running migrations...');
  await dataSource.runMigrations();
  Logger.log('Migrations completed!');

  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  await app.listen(PORT).then(() => {
    Logger.log(`Server is running on port ${PORT}`);
    Logger.log(`SocketIO is running on port ${SOCKETIO_PORT}`);
  });
}

bootstrap();
