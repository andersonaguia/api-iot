import { Module, forwardRef } from '@nestjs/common';
import { ControllersModule } from '../controllers/controllers.module';
import { AlarmsRepository } from './alarms.repository';
import { AlarmsController } from './controllers/alarms.controller';
import { AlarmsService } from './services/alarms.service';
import { AlarmDataModule } from '../alarm-data/alarm-data.module';

@Module({
  imports: [ControllersModule, forwardRef(() => AlarmDataModule)],
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmsRepository],
  exports: [AlarmsService],
})
export class AlarmsModule {}
