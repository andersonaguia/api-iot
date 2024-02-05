import { Injectable } from '@nestjs/common';
import { ControllersRepository } from '../controllers.repository';
import { CreateControllerDto } from '../dto/create-controller.dto';
import { ControllersEntity } from '../entities/controllers.entity';

@Injectable()
export class ControllersService {
  constructor(private readonly controllersRepository: ControllersRepository) {}

  create(controllerData: CreateControllerDto): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, model, connectionType, ipAddress, macAddress, location } =
          controllerData;

        const controller = new ControllersEntity();
        controller.name = name;
        controller.model = model;
        controller.connectionType = connectionType;
        controller.ipAddress = ipAddress;
        controller.macAddress = macAddress;
        controller.createdAt = new Date();
        controller.location = location;

        const newcontroller = await this.controllersRepository.addController(
          controller,
        );
        resolve(newcontroller);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByIpAddress(ipAddress: string): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.controllersRepository.findByIpAddress(
          ipAddress,
        );
        controller
          ? resolve(controller)
          : reject({ code: 404, message: 'Nenhum dispositivo encontrado.' });
      } catch (error) {
        reject(error);
      }
    });
  }

  findByMacAddress(macAddress: string): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.controllersRepository.findByMacAddress(
          macAddress,
        );
        controller
          ? resolve(controller)
          : reject({ code: 404, message: 'Nenhum dispositivo encontrado.' });
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.controllersRepository.findById(+id);
        controller
          ? resolve(controller)
          : reject({
              code: 404,
              message: 'Nenhum dispositivo encontrado para o id informado.',
            });
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<ControllersEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const controllers = await this.controllersRepository.findAll();
        resolve(controllers);
      } catch (error) {
        reject(error);
      }
    });
  }
}
