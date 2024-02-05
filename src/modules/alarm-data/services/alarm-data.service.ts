import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AlarmDataRepository } from '../alarm-data.repository';
import { AlarmsService } from 'src/modules/alarms/services/alarms.service';
import { NewAlarmDataDto } from '../dto/new-alarm-data.dto';
import { AlarmDataEntity } from '../entities/alarm-data.entity';

@Injectable()
export class AlarmDataService {
  constructor(
    private readonly alarmDataRepository: AlarmDataRepository,
    @Inject(forwardRef(() => AlarmsService))
    private readonly alarmService: AlarmsService,
  ) {}

  add(data: NewAlarmDataDto): Promise<AlarmDataEntity> {
    return new Promise(async (resolve, reject) => {
      const { alarmId, enabled, sendMessage, visible } = data;
      try {
        const alarm = await this.alarmService.findById(+alarmId);

        if (!alarm) {
          reject({
            code: 404,
            message: 'Nenhum alarme encontrado para o id informado',
          });
        } else {
          const alarmData = new AlarmDataEntity();
          alarmData.alarm = alarm;
          alarmData.enabled = enabled;
          alarmData.sendMessage = sendMessage;
          alarmData.visible = visible;

          const newAlarmData = await this.alarmDataRepository.add(alarmData);

          resolve(newAlarmData);
        }
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
        const allRelayState = await this.alarmDataRepository.findAllByControllerId(+controllerId);
        resolve(allRelayState);
      } catch (error) {
        reject(error);
      }
    });
  }
}
