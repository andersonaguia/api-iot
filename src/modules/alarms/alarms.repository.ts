import { Injectable } from '@nestjs/common';
import { DataSource, Equal, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AlarmsEntity } from './entities/alarms.entity';

@Injectable()
export class AlarmsRepository extends Repository<AlarmsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AlarmsEntity, dataSource.createEntityManager());
  }

  add(alarmData: AlarmsEntity): Promise<AlarmsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarm = await this.save(alarmData);
        resolve(alarm);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<AlarmsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarm = await this.findOne({
          where: {
            id: Equal(+id),
          },
        });
        resolve(alarm);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAllByControllerId(controllerId: number): Promise<AlarmsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarms = await this.find({
          where: {
            controller: Equal(+controllerId),
          },
        });
        resolve(alarms);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByControllerPort(
    controllerId: number,
    controllerPort: string,
  ): Promise<AlarmsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarm = await this.findOne({
          where: {
            controller: Equal(+controllerId),
            controllerPort: controllerPort,
          },
        });
        resolve(alarm);
      } catch (error) {
        reject(error);
      }
    });
  }
}
