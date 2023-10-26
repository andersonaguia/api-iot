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

  addThermistor(thermistorData: ThermistorValueDto): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { controllerId, controllerPort, location, manufacturer, maxRange, minRange, model, nominalResistance, serialNumber, voltageDividerResistance } = thermistorData;
        const controller = await this.deviceService.findById(+controllerId);

        const thermistor = new ThermistorsEntity();
        thermistor.controller = controller;
        thermistor.controllerPort = controllerPort;
        thermistor.location = location;
        thermistor.manufacturer = manufacturer;
        thermistor.maxRange = maxRange;
        thermistor.minRange = minRange;
        thermistor.model = model;
        thermistor.nominalResistance = nominalResistance;
        thermistor.serialNumber = serialNumber;
        thermistor.voltageDividerResistance = voltageDividerResistance;

        const thermistorSaved = await this.thermistorsRepository.addThermistor(
          thermistor
        );
        
        resolve(thermistorSaved);
      } catch (error) {
        reject(error);
      }
    });
  }
}
