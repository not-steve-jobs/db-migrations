import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

import { AccountPeriodicUpdates } from './AccountPeriodicUpdates';

@Index('accountperiodicupdatefields_id_unique', ['id'], { unique: true })
@Entity('accountPeriodicUpdateFields')
export class AccountPeriodicUpdateFields {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('char', { length: 36 })
  public accountPeriodicUpdateId: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('varchar', { length: 255 })
  public value: string;

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

  @ManyToOne(
    () => Profiles,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'accountperiodicupdatefields_accountid_foreign' }])
  public account: Profiles;

  @ManyToOne(
    () => AccountPeriodicUpdates,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'accountperiodicupdatefields_accountperiodicupdateid_foreign' }])
  public accountPeriodicUpdate: AccountPeriodicUpdates;
}
