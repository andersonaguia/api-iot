import { BaseEntity } from "src/core/entities";
import { DeviceEntity } from "src/modules/devices/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "thermistors" })
export class ThermistorsEntity extends BaseEntity {
  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  value: number;

  @ManyToOne(() => DeviceEntity, { nullable: false })
  @JoinColumn({ name: "device_id" })
  device: DeviceEntity;
}
