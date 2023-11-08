import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { RelayDataEntity } from "./entities/relay-data.entity";

@Injectable()
export class RelayDataRepository extends Repository<RelayDataEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RelayDataEntity, dataSource.createEntityManager());
  }

  changeState(
    relayData: RelayDataEntity
  ): Promise<RelayDataEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newRelayState = await this.save(relayData);
        resolve(newRelayState);
      } catch (error) {
        reject(error);
      }
    });
  }
}
