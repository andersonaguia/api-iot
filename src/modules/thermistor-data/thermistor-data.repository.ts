import { Injectable } from "@nestjs/common";
import { Between, DataSource, Equal, Repository } from "typeorm";
import { ThermistorDataEntity } from "./entities/thermistor-data.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { FindValuesByDateDto } from "./dto/find-by-date.dto";

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
          order: { createdAt: "DESC" },
          take: 1,
        });
        resolve(thermistorData);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findValuesByDate(data: FindValuesByDateDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { startDate, endDate, limit, page, thermistorId } = data;

        const [results, total] = await this.findAndCount({
          where: {
            thermistor: Equal(thermistorId),
            createdAt: Between(new Date(startDate), new Date(endDate)),
          },
          skip: (page - 1) * limit,
          take: limit,
        });

        resolve({
          total,
          values: results,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
