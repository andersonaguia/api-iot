import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RelayDataEntity } from './entities/relay-data.entity';

@Injectable()
export class RelayDataRepository extends Repository<RelayDataEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RelayDataEntity, dataSource.createEntityManager());
  }

  newRelayState(relayData: RelayDataEntity): Promise<RelayDataEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newRelayState = await this.save(relayData);
        resolve(newRelayState);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAllRelayStateByControllerId(
    controllerId: number,
  ): Promise<RelayDataEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const latestRelayStates = await this.createQueryBuilder('relay_data')
          .innerJoinAndSelect('relay_data.relay', 'relay')
          .innerJoin('relay_data.relay', 'relays')
          .where('relays.controllerId = :controllerId', { controllerId })
          .andWhere((subQuery) => {
            const subQueryAlias = subQuery
              .subQuery()
              .select('MAX(rd.createdAt)')
              .from('relay_data', 'rd')
              .where('rd.relayId = relays.id')
              .getQuery();
            return `relay_data.createdAt = (${subQueryAlias})`;
          })
          .getMany();

        const latestRelayStatesFormatted = latestRelayStates.map(
          (relayState) => {
            delete relayState.createdAt;
            delete relayState.updatedAt;
            delete relayState.deletedAt;
            delete relayState.relay.createdAt;
            delete relayState.relay.updatedAt;
            delete relayState.relay.deletedAt;
            return relayState;
          },
        );
        resolve(latestRelayStatesFormatted);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
