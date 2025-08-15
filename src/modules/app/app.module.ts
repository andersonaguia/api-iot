import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/common/env';
import { join } from 'path';
import { dataSourceOptions } from 'src/core/database/data-source';
import { AuthModule } from 'src/core/auth/auth.module';
import { ThermistorsModule } from '../thermistors/thermistors.module';
import { ControllersModule } from '../controllers/controllers.module';
import { ThermistorDataModule } from '../thermistor-data/thermistor-data.module';
import { RelaysModule } from '../relays/relays.module';
import { RelayDataModule } from '../relay-data/relay-data.module';
import { EventsModule } from 'src/modules/events/events.module';
import { AlarmsModule } from '../alarms/alarms.module';
import { AlarmDataModule } from '../alarm-data/alarm-data.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from '../jobs/jobs.module';
import { HealthCheckController } from './controllers/health-check.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', '..', 'public'),
    // }),
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    AuthModule,
    ControllersModule,
    ThermistorsModule,
    ThermistorDataModule,
    RelaysModule,
    RelayDataModule,
    EventsModule,
    AlarmsModule,
    AlarmDataModule,
    ScheduleModule.forRoot(),
    JobsModule
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
