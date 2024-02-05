import { Module, forwardRef } from '@nestjs/common';
import { AlarmDataRepository } from './alarm-data.repository';
import { AlarmsModule } from '../alarms/alarms.module';
import { AlarmDataController } from './controllers/alarm-data.controller';
import { AlarmDataService } from './services/alarm-data.service';

@Module({
  imports: [forwardRef(() => AlarmsModule)],
  controllers: [AlarmDataController],
  providers: [AlarmDataService, AlarmDataRepository],
  exports: [AlarmDataService],
})
export class AlarmDataModule {}
