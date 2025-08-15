import { Controller, Get, HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('health-check')
export class HealthCheckController {
  constructor() {}

  @Get()
  async healthCheck() {
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withBody({
        statusCode: HttpStatus.OK,
        message: 'Im alive',
      })
      .build();
  }
}
