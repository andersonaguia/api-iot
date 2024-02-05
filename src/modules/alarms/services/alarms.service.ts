import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ControllersService } from '../../controllers/services/controllers.service';
import { AlarmsEntity } from '../entities/alarms.entity';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
import { AlarmsRepository } from '../alarms.repository';
import { NewAlarmDataDto } from 'src/modules/alarm-data/dto/new-alarm-data.dto';
import { AlarmDataService } from 'src/modules/alarm-data/services/alarm-data.service';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmsRepository: AlarmsRepository,
    private readonly deviceService: ControllersService,
    @Inject(forwardRef(() => AlarmDataService))
    private readonly alarmDataService: AlarmDataService,
  ) {}

  add(alarmData: CreateAlarmDto): Promise<AlarmsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { controllerId, controllerPort, surname, message } = alarmData;
        const controller = await this.deviceService.findById(+controllerId);

        if (controller) {
          const alarmExist = await this.alarmsRepository.findByControllerPort(
            +controllerId,
            controllerPort,
          );

          if (alarmExist) {
            reject({
              code: 409,
              message: `Já existe um alarme cadastrado para a porta ${controllerPort}`,
            });
          } else {
            const alarm = new AlarmsEntity();
            alarm.controller = controller;
            alarm.controllerPort = controllerPort;
            alarm.surname = surname;
            message ? (alarm.message = message) : (alarm.message = null);

            const alarmSaved = await this.alarmsRepository.add(alarm);

            const alarmState = new NewAlarmDataDto();
            alarmState.alarmId = alarm.id;
            alarmState.enabled = false;
            alarmState.sendMessage = false;
            alarmState.visible = false;

            const initialState = await this.alarmDataService.add(alarmState);

            resolve(alarmSaved);
          }
        } else {
          reject({
            code: 404,
            message: 'Nenhum controlador foi encontrado para o id informado',
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<AlarmsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarm = await this.alarmsRepository.findById(+id);
        if (!alarm) {
          reject({
            code: 404,
            message: 'Nenhum alarme encontrado para o id informado',
          });
        } else {
          resolve(alarm);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findAllByControllerId(controllerId: number): Promise<AlarmsEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const alarms = await this.alarmsRepository.findAllByControllerId(
          +controllerId,
        );

        if (alarms.length > 0) {
          resolve(alarms);
        } else {
          reject({
            code: 404,
            message: 'Nenhum alarme encontrado para o id informado',
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /*
  findByControllerPort(
    controllerId: number,
    controllerPort: number,
  ): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay = await this.relaysRepository.findByControllerPort(
          +controllerId,
          +controllerPort,
        );
        if (!relay) {
          reject({
            code: 404,
            message: 'Nenhum relé encontrado',
          });
        } else {
          resolve(relay);
        }
      } catch (error) {
        reject(error);
      }
    });
  }*/
}
