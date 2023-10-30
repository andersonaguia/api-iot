import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ThermistorsEntity } from "./entities/thermistors.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class ThermistorsRepository extends Repository<ThermistorsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ThermistorsEntity, dataSource.createEntityManager());
  }

  addValue(thermistorData: ThermistorsEntity): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistorValue = await this.save(thermistorData);
        resolve(thermistorValue);
      } catch (error) {
        reject(error);
      }
    });
  }
}
