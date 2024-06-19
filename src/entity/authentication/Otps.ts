import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

//@Index('otps_accountid_foreign', ['accountId'], {})
@Entity('otps')
export class Otps {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { nullable: true, length: 36 })
  public accountId: string | null;

  @Column('int', { name: 'code', width: 6 })
  public code: number;

  @Column('int', { name: 'retries', width: 1 })
  public retries: number;

  @Column('varchar', { length: 20 })
  public target: string;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public isVerified: boolean;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public tokenIsIssued: boolean;

  @Column('varchar', { nullable: true, length: 255 })
  public token: string | null;

  @Column('timestamp', {
    name: 'created',
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {
    name: 'updated',
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id', foreignKeyConstraintName: 'otps_accountid_foreign' }])
  public profile: Profiles;
}
