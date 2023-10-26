import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ThermistorValueDto } from "../dto/thermistor-value.dto";
import { ControllersService } from "../../controllers/services/controllers.service";
import { ThermistorsEntity } from "../entities/thermistors.entity";
import { ThermistorsRepository } from "../thermistors.repository";

@Injectable()
export class ThermistorsService {
  constructor(
    private readonly thermistorsRepository: ThermistorsRepository,
    private readonly deviceService: ControllersService
  ) {}

  addValue(thermistorData: ThermistorValueDto): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { controllerId, temperature } = thermistorData;
        const controller = await this.deviceService.findById(+controllerId);

        const thermistor = new ThermistorsEntity();
        thermistor.value = temperature;
        thermistor.controller = controller;

        const thermistorSaved = await this.thermistorsRepository.addValue(
          thermistor
        );
        
        resolve(thermistorSaved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
