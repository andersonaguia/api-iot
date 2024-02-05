import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { NewAlarmDataDto } from 'src/modules/alarm-data/dto/new-alarm-data.dto';
import { AlarmDataEntity } from 'src/modules/alarm-data/entities/alarm-data.entity';
import { AlarmDataService } from 'src/modules/alarm-data/services/alarm-data.service';
import { ControllersService } from 'src/modules/controllers/services/controllers.service';

@Injectable()
export class AlarmMessageService {
  constructor(
    private readonly alarmDataService: AlarmDataService,
    private readonly controllersService: ControllersService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AlarmMessageService.name);

  @Interval(60000)
  async checkAlarms() {
    //this.logger.debug('Called every 10 seconds');

    const controllers = await this.controllersService.findAll();

    const controllersId = controllers.map((controller) => {
      const controllerId = controller.id;
      return controllerId;
    });

    if (controllersId.length > 0) {
    }

    this.getAlarms(controllersId);
  }

  async getAlarms(controllers: number[]) {
    const alarmsFound = controllers.map(async (controller) => {
      const alarm = await this.alarmDataService.findAllByControllerId(
        controller,
      );
      if (alarm.length > 0) {
        alarm.map(async (alarm) => {
          if (alarm.sendMessage) {
            //console.log('Existem alarmes para o controlador ', controller);
            await this.sendWhatsappMessage(alarm);
          }
          //console.log('Nenhum alarme para o controlador ', controller);
        });

        return;
      }
    });
  }

  async sendWhatsappMessage(
    alarm: AlarmDataEntity,
  ): Promise<AxiosResponse<any>> {
    console.log('Enviando mensagem');
    return new Promise(async (resolve, reject) => {
      const body = {
        number: `120363225371307264@g.us`,
        message: '',
      };
      if (alarm.enabled) {
        body.message = `⚠️ *ALARME NO SISTEMA*\n\n*${alarm.alarm.surname}*\n_${
          alarm.alarm.message ? alarm.alarm.message : ''
        }_`;
      } else {
        body.message = `🙌 *SISTEMA NORMALIZADO*\n\n*${alarm.alarm.surname}*\n_O alarme foi resolvido_`;
      }

      const CONNECT_URL = this.configService.get<string>(
        'apiUrl.whatsapp.connect',
      );

      const SEND_MESSAGE_URL = this.configService.get<string>(
        'apiUrl.whatsapp.sendMessage',
      );

      try {
        const result = await this.httpService.axiosRef.post(
          SEND_MESSAGE_URL,
          body,
        );
        if (result.data.code == 201) {
          const updateAlarm = new NewAlarmDataDto();
          updateAlarm.alarmId = alarm.alarm.id;
          updateAlarm.enabled = alarm.enabled;
          updateAlarm.sendMessage = false;
          updateAlarm.visible = alarm.visible;

          await this.alarmDataService.add(updateAlarm);
        } else if (result.data.code == 401) {
          const result = await this.httpService.axiosRef.get(CONNECT_URL);
        }

        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
