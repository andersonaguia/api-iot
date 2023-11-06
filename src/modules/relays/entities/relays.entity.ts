import { BaseEntity } from "src/core/entities";
import { ControllersEntity } from "src/modules/controllers/entities/controllers.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "relays" })
export class RelaysEntity extends BaseEntity {
  @Column({ nullable: false, default: false })
  activeAtLowLevel: boolean;

  @Column({ length: 50, nullable: false })
  surname: string;  

  @ManyToOne(() => ControllersEntity, { nullable: false })
  @JoinColumn({ name: "controllerId" })
  controller: ControllersEntity;

  @Column({nullable: false})
  controllerPort: number;
}
