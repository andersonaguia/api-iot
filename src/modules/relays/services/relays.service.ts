import { Injectable } from '@nestjs/common';
import { ControllersService } from '../../controllers/services/controllers.service';
import { RelaysRepository } from '../relays.repository';
import { CreateRelayDto } from '../dto/create-relay.dto';
import { RelaysEntity } from '../entities/relays.entity';

@Injectable()
export class RelaysService {
  constructor(
    private readonly relaysRepository: RelaysRepository,
    private readonly deviceService: ControllersService,
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

  findByControllerPort(
    controllerId: number,
    controllerPort: number,
  ): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay =
          await this.relaysRepository.findByControllerPort(
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
