import { Injectable } from "@nestjs/common";
import { Between, DataSource, Equal, Repository } from "typeorm";
import { ThermistorDataEntity } from "./entities/thermistor-data.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { ThermistorsEntity } from "../thermistors/entities/thermistors.entity";

@Injectable()
export class ThermistorsDataRepository extends Repository<ThermistorDataEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ThermistorDataEntity, dataSource.createEntityManager());
  }

  addValue(
    thermistorData: ThermistorDataEntity
  ): Promise<ThermistorDataEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newThermistorData = await this.save(thermistorData);
        resolve(newThermistorData);
      } catch (error) {
        reject(error);
      }
    });
  }

  findActualValue(thermistor: number): Promise<ThermistorDataEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistorData = await this.find({
          where: { thermistor: Equal(thermistor) },
          relations: { thermistor: true },
        });
        resolve(thermistorData);
      } catch (error) {
        reject(error);
      }
    });
  }


}
