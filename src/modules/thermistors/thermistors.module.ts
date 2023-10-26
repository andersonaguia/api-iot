import { Module } from "@nestjs/common";
import { ThermistorsRepository } from "./thermistors.repository";
import { ThermistorsService } from "./services/thermistors.service";
import { ThermistorsController } from "./controllers/thermistors.controller";
import { ControllersModule } from "../controllers/controllers.module";

@Module({
  imports: [ControllersModule],
  controllers: [ThermistorsController],
  providers: [ThermistorsService, ThermistorsRepository],
})
export class ThermistorsModule {}
