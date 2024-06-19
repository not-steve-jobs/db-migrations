import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Referrers } from './Referrers';
import { Profiles } from './Profiles';

@Entity('referees')
export class Referees {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: number;

  @Index('refereeProfileIdIdx', { unique: true })
  @Column('char', { length: 36 })
  public profileId: string;

  @PrimaryColumn('bigint', { nullable: false, width: 20 })
  public referrerId: number;

  @Column('varchar', { default: 'participates', length: 255 })
  public status: string;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
    precision: 3,
  })
  public created: Date;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @Column('timestamp', {
    nullable: true,
    precision: 3,
  })
  public didNotFulfillTheConditionsAt: Date;

  @ManyToOne(() => Referrers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'referrerId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkRefereesReferrerId' }])
  public referrer: Referrers;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'profileId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkRefereesProfileId' }])
  public profile: Profiles;
}
