import { Module, forwardRef } from "@nestjs/common";
import { ThermistorsRepository } from "./thermistors.repository";
import { ThermistorsService } from "./services/thermistors.service";
import { ThermistorsController } from "./controllers/thermistors.controller";
import { DevicesModule } from "../devices/devices.module";

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [ThermistorsController],
  providers: [ThermistorsService, ThermistorsRepository],
})
export class DeviceDataModule {}
