import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { ControllersService } from "../services/controllers.service";
import { CreateControllerDto } from "../dto/create-controller.dto";

@Controller("controllers")
export class ControllersController {
  constructor(private readonly controllersService: ControllersService) {}

  @Post("/create")
  async signUp(@Body(ValidationPipe) controllerData: CreateControllerDto) {
    try {
      const result = await this.controllersService.create(controllerData);
      if (result.id) {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CREATED)
          .withBody({
            statusCode: HttpStatus.CREATED,
            message: "Dispositivo cadastrado com sucesso",
            data: result,
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
      if (error.code === "ER_DUP_ENTRY") {
        return new NestResponseBuilder()
          .withStatus(HttpStatus.CONFLICT)
          .withBody({
            statusCode: 409,
            detail:
              "Existe um dispositivo cadastrado com o mesmo endereço MAC ou IP",
          })
          .build();
      }
      return new NestResponseBuilder()
        .withStatus(HttpStatus.BAD_REQUEST)
        .withBody({
          statusCode: error.code,
          detail: error.sqlMessage,
        })
        .build();
    }
  }

  @Get("/findbyip")
  async findByIp(@Query("ipAddress") ipAddress: string) {
    try {
      const result = await this.controllersService.findByIpAddress(ipAddress);

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

  @Get("/findbymac")
  async findByMac(@Query("macAddress") macAddress: string) {
    try {
      const result = await this.controllersService.findByMacAddress(macAddress);

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

  @Get("/findbyid/:id")
  async findById(@Param("id") id: number) {
    try {
      const result = await this.controllersService.findById(+id);

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
