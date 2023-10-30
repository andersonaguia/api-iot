import { DataSource, Equal, Repository } from "typeorm";
import { ControllersEntity } from "./entities/controllers.entity";
import { InjectDataSource } from "@nestjs/typeorm";""
import { Injectable } from "@nestjs/common";

@Injectable()
export class ControllersRepository extends Repository<ControllersEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ControllersEntity, dataSource.createEntityManager());
  }

  addController(controller: ControllersEntity): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controllerSaved = await this.save(controller);
        resolve(controllerSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByIpAddress(ipAddress: string): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.findOne({
          where: {
            ipAddress: ipAddress,
          },
        });
        resolve(controller);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByMacAddress(macAddress: string): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.findOne({
          where: {
            macAddress: macAddress,
          },
        });
        resolve(controller);
      } catch (error) {
        reject(error);
      }
    });
  }
  findById(id: number): Promise<ControllersEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const controller = await this.findOne({
          where: {
            id: Equal(id),
          },
        });
        resolve(controller);
      } catch (error) {
        reject(error);
      }
    });
  }
}
