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

  addThermistor(
    thermistorData: ThermistorValueDto
  ): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          controllerId,
          controllerPort,
          location,
          manufacturer,
          maxRange,
          minRange,
          model,
          nominalResistance,
          serialNumber,
          voltageDividerResistance,
        } = thermistorData;
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

  findBySerialNumber(serialNumber: string): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.thermistorsRepository.findBySerialNumber(
          serialNumber
        );

        if (!thermistor) {
          reject({
            code: 404,
            message:
              "Nenhum termistor encontrado para o número serial informado",
          });
        } else {
          resolve(thermistor);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.thermistorsRepository.findById(
          +id
        );

        if (!thermistor) {
          reject({
            code: 404,
            message:
              "Nenhum termistor encontrado para o id informado",
          });
        } else {
          resolve(thermistor);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
