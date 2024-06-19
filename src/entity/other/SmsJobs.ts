import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('smsjobs_reference_unique', ['reference'], { unique: true })
@Index('referenceIdx', ['reference'], {})
@Index('smsJobsCreatedIdx', ['created'], {})
@Entity('smsJobs')
export class SmsJobs {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { length: 20 })
  public provider: string;

  @Column('varchar', { length: 20 })
  public status: string;

  @Column('varchar', { nullable: true, length: 255 })
  public statusDescription: string | null;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('varchar', { length: 255 })
  public message: string;

  @Column('varchar', { length: 20 })
  public to: string;

  @Column('varchar', { length: 20 })
  public from: string;

  @Column('varchar', { unique: false, length: 100 })
  public reference: string;

  @Column('text', { nullable: true })
  public rawRequest: string | null;

  @Column('text', { nullable: true })
  public rawResponse: string | null;

  @Column('text', { nullable: true })
  public rawCallback: string | null;

  @Column('timestamp', {

    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {

    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @ManyToOne(() => Profiles, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'accountId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'smsjobs_accountid_foreign',
    },
  ])
  public account: Profiles;
}
