import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ThermistorDataService } from "../services/thermistor-data.service";
import { CreateThermistorDataDto } from "../dto/create-thermistor-data.dto";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";

@Controller("/thermistordata")
export class ThermistorDataController {
  constructor(private readonly thermistorDataService: ThermistorDataService) {}

  @Post("/add")
  async add(@Body() data: CreateThermistorDataDto) {
    try {
      const result = await this.thermistorDataService.addValue(data);
      if (result) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: "Dados cadastrados com sucesso",
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

  @Get("/findactualvalue/:thermistorid")
  async findBySerialNumber(@Param("thermistorid") thermistorId: number) {
    try {
      const result = await this.thermistorDataService.findActualValue(
        thermistorId
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
