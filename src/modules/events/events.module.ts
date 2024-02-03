import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RelayDataModule } from '../relay-data/relay-data.module';

@Module({
  providers: [EventsGateway],
  imports:[RelayDataModule]
})
export class EventsModule {}