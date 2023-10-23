import { BaseEntity } from "src/core/entities";
import { Column, Entity } from "typeorm";
import { ConnectionType } from "../enum/connection.type";

@Entity({ name: "devices" })
export class DeviceEntity extends BaseEntity {
  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 20, nullable: false })
  model: string;

  @Column({ type: "enum", enum: ConnectionType, nullable: false })
  connectionType: ConnectionType;

  @Column({ length: 20, unique: true, nullable: false })
  ipAddress: string;

  @Column({ length: 50, unique: true })
  macAddress: string;

  @Column({length: 50, nullable: false})
  location: string;
}
