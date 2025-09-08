import { Module, forwardRef } from '@nestjs/common';
import { AlarmMessageService } from './services/alarm-message.service';
import { AlarmDataModule } from '../alarm-data/alarm-data.module';
import { ControllersModule } from '../controllers/controllers.module';
import { HttpModule } from '@nestjs/axios';
import { RelayScheduleService } from './services/relay-schedule.service';

@Module({
  imports: [
    forwardRef(() => AlarmDataModule),
    forwardRef(() => ControllersModule),
    HttpModule,
  ],
  controllers: [],
  providers: [AlarmMessageService, RelayScheduleService],
  exports: [RelayScheduleService],
})
export class JobsModule {}
