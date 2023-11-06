import { Injectable } from "@nestjs/common";
import { DataSource, Equal, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { RelaysEntity } from "./entities/relays.entity";

@Injectable()
export class RelaysRepository extends Repository<RelaysEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RelaysEntity, dataSource.createEntityManager());
  }

  addThermistor(relayData: RelaysEntity): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay = await this.save(relayData);
        resolve(relay);
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<RelaysEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const relay = await this.findOne({
          where: {
            id: +id,
          },
        });
        resolve(relay);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByControllerPort(controllerId: number, controllerPort: number): Promise<RelaysEntity>{
    return new Promise(async(resolve, reject) => {
      try{
        const relay = await this.findOne({
          where: {
            controller: Equal(+controllerId),
            controllerPort: +controllerPort,
          },
        });
        resolve(relay);

      }catch(error){
        reject(error);
      }
    })
  }
}
