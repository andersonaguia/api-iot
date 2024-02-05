import { Module, forwardRef } from '@nestjs/common';
import { AlarmMessageService } from './services/alarm-message.service';
import { AlarmDataModule } from '../alarm-data/alarm-data.module';
import { ControllersModule } from '../controllers/controllers.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    forwardRef(() => AlarmDataModule),
    forwardRef(() => ControllersModule),
    HttpModule,
  ],
  controllers: [],
  providers: [AlarmMessageService],
  exports: [],
})
export class JobsModule {}
