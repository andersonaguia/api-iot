import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AlarmDataEntity } from './entities/alarm-data.entity';

@Injectable()
export class AlarmDataRepository extends Repository<AlarmDataEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AlarmDataEntity, dataSource.createEntityManager());
  }

  add(alarmData: AlarmDataEntity): Promise<AlarmDataEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newAlarm = await this.save(alarmData);
        resolve(newAlarm);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAllByControllerId(
    controllerId: number,
  ): Promise<AlarmDataEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const latestAlarms = await this.createQueryBuilder('alarm_data')
          .innerJoinAndSelect('alarm_data.alarm', 'alarm')
          .innerJoin('alarm_data.alarm', 'alarms')
          .where('alarms.controllerId = :controllerId', { controllerId })
          .andWhere((subQuery) => {
            const subQueryAlias = subQuery
              .subQuery()
              .select('MAX(ad.createdAt)')
              .from('alarm_data', 'ad')
              .where('ad.alarmId = alarms.id')
              .getQuery();
            return `alarm_data.createdAt = (${subQueryAlias})`;
          })
          .getMany();

        const latestAlarmsFormatted = latestAlarms.map(
          (alarm) => {
            delete alarm.createdAt;
            delete alarm.updatedAt;
            delete alarm.deletedAt;
            delete alarm.alarm.createdAt;
            delete alarm.alarm.updatedAt;
            delete alarm.alarm.deletedAt;
            return alarm;
          },
        );
        resolve(latestAlarmsFormatted);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
