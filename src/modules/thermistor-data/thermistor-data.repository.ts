import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ThermistorDataEntity } from "./entities/thermistor-data.entity";
import { InjectDataSource } from "@nestjs/typeorm";

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
}
