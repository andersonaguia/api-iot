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
          voltageDividerResistance,
        } = thermistorData;
        const controller = await this.deviceService.findById(+controllerId);

        if (controller) {
          const thermistorExist =
            await this.thermistorsRepository.findByControllerPort(+controllerId, +controllerPort);

          if (thermistorExist) {
            reject({
              code: 409,
              message:
                "Já existe um termistor cadastrado com o mesmo serial number",
            });
          } else {
            const thermistor = new ThermistorsEntity();
            thermistor.controller = controller;
            thermistor.controllerPort = controllerPort;
            thermistor.location = location;
            thermistor.manufacturer = manufacturer;
            thermistor.maxRange = maxRange;
            thermistor.minRange = minRange;
            thermistor.model = model;
            thermistor.nominalResistance = nominalResistance;
            thermistor.voltageDividerResistance = voltageDividerResistance;

            const thermistorSaved =
              await this.thermistorsRepository.addThermistor(thermistor);

            resolve(thermistorSaved);
          }
        } else {
          reject({
            code: 404,
            message: "Nenhum controlador foi encontrado para o id informado",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.thermistorsRepository.findById(+id);

        if (!thermistor) {
          reject({
            code: 404,
            message: "Nenhum termistor encontrado para o id informado",
          });
        } else {
          resolve(thermistor);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findByControllerPort(
    controllerId: number,
    controllerPort: number
  ): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor =
          await this.thermistorsRepository.findByControllerPort(
            +controllerId,
            +controllerPort
          );
        if (!thermistor) {
          reject({
            code: 404,
            message: "Nenhum termistor encontrado",
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
