import { BaseEntity } from "src/core/entities";
import { ControllersEntity } from "src/modules/controllers/entities/controllers.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "thermistors" })
export class ThermistorsEntity extends BaseEntity {
  @Column({ length: 50, nullable: false })
  manufacturer: string;

  @Column({ length: 30, nullable: false })
  model: string;

  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  minRange: number;

  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  maxRange: number;

  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  nominalResistance: number; 

  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  voltageDividerResistance: number;

  @Column({ length: 30, nullable: false, unique: true })
  serialNumber: string;

  @ManyToOne(() => ControllersEntity, { nullable: false })
  @JoinColumn({ name: "controllerId" })
  controller: ControllersEntity;

  @Column({ length: 20, nullable: false })
  controllerPort: string;

  @Column({ length: 50, nullable: false })
  location: string; 
}
