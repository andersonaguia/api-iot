import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ThermistorDataService } from "../services/thermistor-data.service";
import { CreateThermistorDataDto } from "../dto/create-thermistor-data.dto";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { FindValuesByDateDto } from "../dto/find-by-date.dto";

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

  @Get("/find-values-by-date")
  async findValuesByDate(
    @Query("thermistorId") thermistorId: number,
    @Query("startDate") startDate: Date,
    @Query("endDate") endDate: Date,
    @Query("page", new DefaultValuePipe(1)) page: number,
    @Query("limit", new DefaultValuePipe(10)) limit: number
  ) {
    try {
      const searchData = new FindValuesByDateDto();
      searchData.thermistorId = +thermistorId;
      searchData.startDate = startDate;
      searchData.endDate = endDate;
      searchData.page = page;
      searchData.limit = limit;

      const result = await this.thermistorDataService.findValuesByDate(
        searchData
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
