import { Module } from '@nestjs/common';
import { RelayDataController } from './controllers/relay-data.controller';
import { RelayDataService } from './services/relay-data.service';
import { RelayDataRepository } from './relay-data.repository';
import { RelaysModule } from '../relays/relays.module';

@Module({
  imports: [RelaysModule],
  controllers: [RelayDataController],
  providers: [RelayDataService, RelayDataRepository],
})
export class RelayDataModule {}
