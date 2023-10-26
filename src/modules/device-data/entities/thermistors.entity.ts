import { BaseEntity } from "src/core/entities";
import { ControllersEntity } from "src/modules/controllers/entities/controllers.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "thermistors" })
export class ThermistorsEntity extends BaseEntity {
  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  value: number;

  @ManyToOne(() => ControllersEntity, { nullable: false })
  @JoinColumn({ name: "controllerId" })
  controller: ControllersEntity;
}
