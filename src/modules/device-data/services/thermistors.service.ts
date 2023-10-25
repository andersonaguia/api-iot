import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ThermistorValueDto } from "../dto/thermistor-value.dto";
import { DevicesService } from "../../devices/services/devices.service";
import { ThermistorsEntity } from "../entities/thermistors.entity";
import { ThermistorsRepository } from "../thermistors.repository";

@Injectable()
export class ThermistorsService {
  constructor(
    private readonly thermistorsRepository: ThermistorsRepository,
    @Inject(forwardRef(() => DevicesService))
    private readonly deviceService: DevicesService
  ) {}

  addValue(thermistorData: ThermistorValueDto): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { deviceId, temperature } = thermistorData;
        const device = await this.deviceService.findById(+deviceId);

        const thermistor = new ThermistorsEntity();
        thermistor.value = temperature;
        thermistor.device = device;

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
