import { Module } from "@nestjs/common";
import { ControllersController } from "./controllers/controllers.controller";
import { ControllersService } from "./services/controllers.service";
import { ControllersRepository } from "./controllers.repository";

@Module({
  imports: [],
  controllers: [ControllersController],
  providers: [ControllersService, ControllersRepository],
  exports: [ControllersService],
})
export class ControllersModule {}
