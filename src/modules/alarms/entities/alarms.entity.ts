import { BaseEntity } from "src/core/entities";
import { ControllersEntity } from "src/modules/controllers/entities/controllers.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "alarms" })
export class AlarmsEntity extends BaseEntity {
  @Column({ length: 255, nullable: false })
  surname: string;  

  @ManyToOne(() => ControllersEntity, { nullable: false })
  @JoinColumn({ name: "controllerId" })
  controller: ControllersEntity;

  @Column({ length: 10, nullable: false })
  controllerPort: string;

  @Column({ length: 255, nullable: true })
  message: string;
}
