import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('accountperiodicupdates_id_unique', ['id'], { unique: true })
@Entity('accountPeriodicUpdates')
export class AccountPeriodicUpdates {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('varchar', { length: 40 })
  public status: string;

  @Column('tinyint', {
    name: 'personalDataSubmitted',
    width: 1,
    default: () => "'0'",
  })
  public personalDataSubmitted: boolean;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public taxIdSubmitted: boolean;

  @Column('tinyint', {
    name: 'proofOfResidenceSubmitted',
    width: 1,
    default: () => "'0'",
  })
  public proofOfResidenceSubmitted: boolean;

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

  @Column('timestamp', {
    name: 'endDate',
    default: () => '0000-00-00 00:00:00.000',
    precision: 3,

  })
  public endDate: Date;

  @Column('timestamp', {
    name: 'startDate',
    default: () => '0000-00-00 00:00:00.000',
    precision: 3,
  })
  public startDate: Date;

  // @OneToMany(
  //   () => AccountPeriodicUpdateFields,
  //   accountPeriodicUpdateFields =>
  //     accountPeriodicUpdateFields.accountPeriodicUpdate
  // )
  // public accountPeriodicUpdateFields: AccountPeriodicUpdateFields[];

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'accountperiodicupdates_accountid_foreign' }])
  public account: Profiles;
}
