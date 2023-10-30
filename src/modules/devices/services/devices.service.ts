import { Injectable } from "@nestjs/common";
import { DevicesRepository } from "../devices.repository";
import { CreateDeviceDto } from "../dto/create-device.dto";
import { DeviceEntity } from "../entities/device.entity";

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  create(deviceData: CreateDeviceDto): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, model, connectionType, ipAddress, macAddress, location } =
          deviceData;

        const device = new DeviceEntity();
        device.name = name;
        device.model = model;
        device.connectionType = connectionType;
        device.ipAddress = ipAddress;
        device.macAddress = macAddress;
        device.createdAt = new Date();
        device.location = location;

        const newDevice = await this.devicesRepository.addDevice(device);
        resolve(newDevice);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByIpAddress(ipAddress: string): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findByIpAddress(ipAddress);
        device
          ? resolve(device)
          : reject({ code: 404, message: "Nenhum dispositivo encontrado." });
      } catch (error) {
        reject(error);
      }
    });
  }

  findByMacAddress(macAddress: string): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findByMacAddress(
          macAddress
        );
        device
          ? resolve(device)
          : reject({ code: 404, message: "Nenhum dispositivo encontrado." });
      } catch (error) {
        reject(error);
      }
    });
  }

  findById(id: number): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.devicesRepository.findById(+id);
        device
          ? resolve(device)
          : reject({ code: 404, message: "Nenhum dispositivo encontrado para o id informado." });
      } catch (error) {
        reject(error);
      }
    });
  }
}
