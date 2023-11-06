import { Module } from "@nestjs/common";
import { ControllersModule } from "../controllers/controllers.module";
import { RelaysController } from "./controllers/relays.controller";
import { RelaysService } from "./services/relays.service";
import { RelaysRepository } from "./relays.repository";

@Module({
  imports: [ControllersModule],
  controllers: [RelaysController],
  providers: [RelaysService, RelaysRepository],
  exports: [RelaysService],
})
export class RelaysModule {}
