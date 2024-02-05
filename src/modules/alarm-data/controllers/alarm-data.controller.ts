import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

import { AlarmDataService } from '../services/alarm-data.service';
import { NewAlarmDataDto } from '../dto/new-alarm-data.dto';

@Controller('/alarmdata')
export class AlarmDataController {
  constructor(private readonly alarmDataService: AlarmDataService) {}

  @Post('/new')
  async newRelayState(@Body() data: NewAlarmDataDto) {
    try {
      const result = await this.alarmDataService.add(data);
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
            message: 'Falha ao cadastrar o alarme. Tente novamente!',
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

  @Get('/findallbycontrollerid/:id')
  async findAllRelayStateByControllerId(@Param('id') controllerId: number) {
    try {      
      const result = await this.alarmDataService.findAllByControllerId(
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
}
