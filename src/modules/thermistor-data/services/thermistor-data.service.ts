import { Injectable } from "@nestjs/common";
import { ThermistorsDataRepository } from "../thermistor-data.repository";
import { ThermistorsService } from "src/modules/thermistors/services/thermistors.service";
import { CreateThermistorDataDto } from "../dto/create-thermistor-data.dto";
import { ThermistorDataEntity } from "../entities/thermistor-data.entity";
import { FindValuesByDateDto } from "../dto/find-by-date.dto";

@Injectable()
export class ThermistorDataService {
  constructor(
    private readonly thermistorsDataRepository: ThermistorsDataRepository,
    private readonly thermistorsService: ThermistorsService
  ) {}

  addValue(data: CreateThermistorDataDto): Promise<ThermistorDataEntity> {
    return new Promise(async (resolve, reject) => {
      const { thermistorId, value } = data;
      try {
        const thermistor = await this.thermistorsService.findById(
          +thermistorId
        );

        if (!thermistor) {
          reject({
            code: 404,
            message: "Nenhum termistor encontrado para o id informado",
          });
        } else {
          const thermistorData = new ThermistorDataEntity();
          thermistorData.thermistor = thermistor;
          thermistorData.value = value;

          const newThermistorData =
            await this.thermistorsDataRepository.addValue(thermistorData);

          resolve(newThermistorData);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findActualValue(thermistorId: number): Promise<ThermistorDataEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.thermistorsService.findById(
          +thermistorId
        );
        if (!thermistor) {
          reject({
            code: 404,
            message: "Nenhum termistor encontrado para o id informado",
          });
        } else {
          const thermistorData =
            await this.thermistorsDataRepository.findActualValue(thermistorId);

          resolve(thermistorData);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findValuesByDate(data: FindValuesByDateDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { thermistorId } = data;
      try {
        const thermistor = await this.thermistorsService.findById(
          +thermistorId
        );

        if (!thermistor) {
          reject({
            code: 404,
            message: "Nenhum termistor encontrado para o id informado",
          });
        } else {
          const thermistorValues =
            await this.thermistorsDataRepository.findValuesByDate(data);
          resolve(thermistorValues);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
