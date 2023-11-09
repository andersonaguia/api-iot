import { Module, forwardRef } from '@nestjs/common';
import { ControllersModule } from '../controllers/controllers.module';
import { RelaysController } from './controllers/relays.controller';
import { RelaysService } from './services/relays.service';
import { RelaysRepository } from './relays.repository';
import { RelayDataModule } from '../relay-data/relay-data.module';

@Module({
  imports: [ControllersModule, forwardRef(() => RelayDataModule)],
  controllers: [RelaysController],
  providers: [RelaysService, RelaysRepository],
  exports: [RelaysService],
})
export class RelaysModule {}
