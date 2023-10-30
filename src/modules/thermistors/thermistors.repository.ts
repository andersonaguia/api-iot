import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ThermistorsEntity } from "./entities/thermistors.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class ThermistorsRepository extends Repository<ThermistorsEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ThermistorsEntity, dataSource.createEntityManager());
  }

  addThermistor(thermistorData: ThermistorsEntity): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.save(thermistorData);
        resolve(thermistor);
      } catch (error) {
        reject(error);
      }
    });
  }

  findBySerialNumber(serialNumber: string): Promise<ThermistorsEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const thermistor = await this.findOne({
          where: {
            serialNumber: serialNumber,
          },
        });
        resolve(thermistor);
      } catch (error) {
        reject(error);
      }
    });
  }
}
