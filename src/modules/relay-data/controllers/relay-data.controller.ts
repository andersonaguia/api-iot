import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { RelayDataService } from '../services/relay-data.service';
import { NewRelayStateDto } from '../dto/new-relay-state';
import { RelayScheduleService } from '../../jobs/services/relay-schedule.service';

@Controller('/relaydata')
export class RelayDataController {
  constructor(
    private readonly relayDataService: RelayDataService,
    private readonly relayScheduleService: RelayScheduleService,
  ) {}

  @Post('/newrelaystate')
  async newRelayState(@Body() data: NewRelayStateDto) {
    console.log(data);
    try {
      const result = await this.relayDataService.newRelayState(data);
      if (result) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: 'Dados cadastrados com sucesso',
          })
          .build();
      } else {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.BAD_REQUEST)
          .withBody({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Falha ao cadastrar o dispositivo. Tente novamente!',
          })
          .build();
      }
    } catch (error) {
      if (error.code === 404) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.NOT_FOUND)
          .withBody({
            statusCode: error.code,
            message: error.message,
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: error.code,
          message: error.sqlMessage,
        })
        .build();
    }
  }

  @Get('/findallrelaystatebycontrollerid/:id')
  async findAllRelayStateByControllerId(@Param('id') controllerId: number) {
    try {
      const result =
        await this.relayDataService.findAllRelayStateByControllerId(
          +controllerId,
        );

      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withBody({
          statusCode: HttpStatus.OK,
          data: result,
        })
        .build();
    } catch (error) {
      if (error.code === 404) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.NOT_FOUND)
          .withBody({
            statusCode: HttpStatus.NOT_FOUND,
            detail: error.message,
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: HttpStatus.BAD_REQUEST,
          detail: error.sqlMessage,
        })
        .build();
    }
  }

  @Post('/findstateforschedule')
  async findStateForSchedule(
    @Body()
    data: {
      dIn1: boolean;
      dIn2: boolean;
      dIn3: boolean;
      dIn4: boolean;
      dIn5: boolean;
      dIn6: boolean;
      dIn7: boolean;
      dIn8: boolean;
    },
  ) {
    try {
      const now = new Date();
      const relaysState = this.relayScheduleService.getRelayStatus();

      console.log('DATETIME: ', now.toLocaleString('pt-BR'));
      console.log('AUTO MODE: ', data.dIn1);
      console.log('ALL DIGITAL INPUT STATUS: ', data);
      console.log('KEEP ON: ', relaysState && data.dIn1);
      console.log('');

      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withBody({
          statusCode: HttpStatus.OK,
          data: relaysState && data.dIn1,
        })
        .build();
    } catch (error) {
      if (error.code === 404) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.NOT_FOUND)
          .withBody({
            statusCode: HttpStatus.NOT_FOUND,
            detail: error.message,
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: HttpStatus.BAD_REQUEST,
          detail: error.sqlMessage,
        })
        .build();
    }
  }

  @Post('/setRelayStatus')
  async setRelayStatus(
    @Body()
    data: {
      newStatus: boolean;
    },
  ) {
    try {
      await this.relayScheduleService.setRelayStatus(data.newStatus);

      const newState = await this.relayScheduleService.getRelayStatus();

      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withBody({
          statusCode: HttpStatus.CREATED,
          newStatus: newState
        })
        .build();
    } catch (error) {
      if (error.code === 404) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.NOT_FOUND)
          .withBody({
            statusCode: HttpStatus.NOT_FOUND,
            detail: error.message,
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: HttpStatus.BAD_REQUEST,
          detail: error.sqlMessage,
        })
        .build();
    }
  }
}



