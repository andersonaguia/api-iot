import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ThermistorsService } from "../services/thermistors.service";
import { ThermistorValueDto } from "../dto/thermistor-value.dto";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { ThermistorsEntity } from "../entities/thermistors.entity";

@Controller("thermistors")
export class ThermistorsController {
  constructor(private readonly thermistorsService: ThermistorsService) {}

  @Post("/add")
  async add(@Body() data: ThermistorValueDto) {
    try {
      const result = await this.thermistorsService.addThermistor(data);
      if (result) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: "Sensor cadastrado com sucesso",
          })
          .build();
      } else {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.BAD_REQUEST)
          .withBody({
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Falha ao cadastrar o dispositivo. Tente novamente!",
          })
          .build();
      }
    } catch (error) {
      console.log(error);
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

  @Get("/findbyserialnumber/:serialnumber")
  async findBySerialNumber(@Param("serialnumber") serialNumber: string) {
    try {
      const result = await this.thermistorsService.findBySerialNumber(
        serialNumber
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
