import { Module, forwardRef } from '@nestjs/common';
import { RelayDataController } from './controllers/relay-data.controller';
import { RelayDataService } from './services/relay-data.service';
import { RelayDataRepository } from './relay-data.repository';
import { RelaysModule } from '../relays/relays.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [JobsModule, forwardRef(() => RelaysModule)],
  controllers: [RelayDataController],
  providers: [RelayDataService, RelayDataRepository],
  exports: [RelayDataService],
})
export class RelayDataModule {}
