import { BaseEntity } from 'src/core/entities';
import { RelaysEntity } from 'src/modules/relays/entities/relays.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'relay_data' })
export class RelayDataEntity extends BaseEntity {
  @Column({ nullable: false })
  expectedLevel: boolean;

  @Column({ nullable: false })
  currentLevel: boolean;

  @ManyToOne(() => RelaysEntity, { nullable: false })
  @JoinColumn({ name: 'relayId' })
  relay: RelaysEntity;
}
