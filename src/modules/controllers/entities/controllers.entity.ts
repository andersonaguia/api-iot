import { BaseEntity } from "src/core/entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ConnectionType } from "../enum/connection.type";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Entity({ name: "controllers" })
export class ControllersEntity extends BaseEntity {
  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 20, nullable: false })
  model: string;

  @Column({ type: "enum", enum: ConnectionType, nullable: false })
  connectionType: ConnectionType;

  @Column({ length: 20, unique: true, nullable: false })
  ipAddress: string;

  @Column({ length: 50, unique: true, nullable: false })
  macAddress: string;

  @Column({length: 50, nullable: false})
  location: string;
}
