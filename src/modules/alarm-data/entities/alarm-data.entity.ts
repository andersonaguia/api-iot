import { BaseEntity } from 'src/core/entities';
import { AlarmsEntity } from 'src/modules/alarms/entities/alarms.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'alarm_data' })
export class AlarmDataEntity extends BaseEntity {
  @Column({ nullable: false })
  enabled: boolean;

  @Column({ nullable: false })
  sendMessage: boolean;

  @Column({ nullable: false })
  visible: boolean;

  @ManyToOne(() => AlarmsEntity, { nullable: false })
  @JoinColumn({ name: 'alarmId' })
  alarm: AlarmsEntity;
}
