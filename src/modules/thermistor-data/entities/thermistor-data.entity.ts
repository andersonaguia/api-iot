import { BaseEntity } from "src/core/entities";
import { ThermistorsEntity } from "src/modules/thermistors/entities/thermistors.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "thermistors_data" })
export class ThermistorDataEntity extends BaseEntity {
  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  },)
  value: number;

  @ManyToOne(() => ThermistorsEntity, { nullable: false })
  @JoinColumn({ name: "thermistorId" })
  thermistor: ThermistorsEntity;
}
