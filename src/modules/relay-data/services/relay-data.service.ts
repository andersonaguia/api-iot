import { Injectable } from "@nestjs/common";
import { RelayDataRepository } from "../relay-data.repository";
import { RelaysService } from "src/modules/relays/services/relays.service";
import { NewRelayStateDto } from "../dto/new-relay-state";
import { RelayDataEntity } from "../entities/relay-data.entity";

@Injectable()
export class RelayDataService {
  constructor(
    private readonly relayDataRepository: RelayDataRepository,
    private readonly relayService: RelaysService
  ) {}

  newRelayState(data: NewRelayStateDto): Promise<RelayDataEntity> {
    return new Promise(async (resolve, reject) => {
      const { expectedLevel, currentLevel, relayId } = data;
      try {
        const relay = await this.relayService.findById(
          +relayId
        );

        if (!relay) {
          reject({
            code: 404,
            message: "Nenhum relé encontrado para o id informado",
          });
        } else {
          const relayData = new RelayDataEntity();
          relayData.expectedLevel = expectedLevel;
          relayData.currentLevel  = currentLevel;
          relayData.relay = relay;

          const newRelayData =
            await this.relayDataRepository.changeState(relayData);

          resolve(newRelayData);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
