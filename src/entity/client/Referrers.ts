import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Profiles } from './Profiles';

@Entity('referrers')
export class Referrers {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @Index('referrerProfileIdIdx', { unique: true })
  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 255 })
  public status: string;

  @Index('referrerIdentifierIdx', { unique: true })
  @Column('int', { nullable: true, width: 2 })
  public identifier: number;

  @Column('timestamp', {
    nullable: false,
    default: () => `'2035-06-01 00:00:00'`,
  })
  public eligibilityExpiration: Date;

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

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'profileId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fkReferrersProfileId',
    },
  ])
  public profile: Profiles;
}
