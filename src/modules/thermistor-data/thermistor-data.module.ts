import { Module } from "@nestjs/common";
import { ThermistorsModule } from "../thermistors/thermistors.module";
import { ThermistorDataService } from "./services/thermistor-data.service";
import { ThermistorsDataRepository } from "./thermistor-data.repository";
import { ThermistorDataController } from "./controllers/thermistor-data.controller";

@Module({
  imports: [ThermistorsModule],
  controllers: [ThermistorDataController],
  providers: [ThermistorDataService, ThermistorsDataRepository],
})
export class ThermistorDataModule {}