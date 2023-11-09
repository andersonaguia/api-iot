import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ControllersService } from '../../controllers/services/controllers.service';
import { RelaysRepository } from '../relays.repository';
import { CreateRelayDto } from '../dto/create-relay.dto';
import { RelaysEntity } from '../entities/relays.entity';
import { RelayDataService } from 'src/modules/relay-data/services/relay-data.service';
import { NewRelayStateDto } from 'src/modules/relay-data/dto/new-relay-state';

@Injectable()
export class RelaysService {
  constructor(
    private readonly relaysRepository: RelaysRepository,
    private readonly deviceService: ControllersService,
    @Inject(forwardRef(() => RelayDataService))
    private readonly relayDataService: RelayDataService,
  ) {}

  addRelay(relayData: CreateRelayDto): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { controllerId, controllerPort, activeAtLowLevel, surname } =
          relayData;
        const controller = await this.deviceService.findById(+controllerId);

        if (controller) {
          const relayExist = await this.relaysRepository.findByControllerPort(
            +controllerId,
            +controllerPort,
          );

          if (relayExist) {
            reject({
              code: 409,
              message: `Já existe um relé cadastrado para a porta ${controllerPort}`,
            });
          } else {
            const relay = new RelaysEntity();
            relay.controller = controller;
            relay.controllerPort = controllerPort;
            relay.activeAtLowLevel = activeAtLowLevel;
            relay.surname = surname;

            const relaySaved = await this.relaysRepository.addRelay(relay);

            const relayState = new NewRelayStateDto();
            relayState.relayId = relay.id;
            relayState.expectedLevel = false;
            relayState.currentLevel = false;

            const initialState = await this.relayDataService.newRelayState(relayState);

            resolve(relaySaved);
          }
        } else {
          reject({
            code: 404,
            message: 'Nenhum controlador foi encontrado para o id informado',
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay = await this.relaysRepository.findById(+id);
        if (!relay) {
          reject({
            code: 404,
            message: 'Nenhum relé encontrado para o id informado',
          });
        } else {
          resolve(relay);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  findAllRelaysByControllerId(controllerId: number): Promise<RelaysEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const relays = await this.relaysRepository.findAllRelaysByControllerId(
          +controllerId,
        );

        if (relays.length > 0) {
          resolve(relays);
        } else {
          reject({
            code: 404,
            message: 'Nenhum relé encontrado para o id informado',
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  findByControllerPort(
    controllerId: number,
    controllerPort: number,
  ): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay = await this.relaysRepository.findByControllerPort(
          +controllerId,
          +controllerPort,
        );
        if (!relay) {
          reject({
            code: 404,
            message: 'Nenhum relé encontrado',
          });
        } else {
          resolve(relay);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
