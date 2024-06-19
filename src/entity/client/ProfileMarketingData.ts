import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Index('fkProfileMarketingDataProfilesIdx', ['profileId'], {})
@Entity('profileMarketingData')
export class ProfileFields {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 255 })
  public invitedBy: string;

  @Column('json')
  public params: JSON;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
