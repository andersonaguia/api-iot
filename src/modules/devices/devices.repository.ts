import { DataSource, Equal, Repository } from "typeorm";
import { DeviceEntity } from "./entities/device.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DevicesRepository extends Repository<DeviceEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(DeviceEntity, dataSource.createEntityManager());
  }

  addDevice(device: DeviceEntity): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const deviceSaved = await this.save(device);
        resolve(deviceSaved);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByIpAddress(ipAddress: string): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findOne({
          where: {
            ipAddress: ipAddress,
          },
        });
        resolve(device);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByMacAddress(macAddress: string): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findOne({
          where: {
            macAddress: macAddress,
          },
        });
        resolve(device);
      } catch (error) {
        reject(error);
      }
    });
  }
  findById(id: number): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findOne({
          where: {
            id: Equal(id),
          },
        });
        resolve(device);
      } catch (error) {
        reject(error);
      }
    });
  }
}
