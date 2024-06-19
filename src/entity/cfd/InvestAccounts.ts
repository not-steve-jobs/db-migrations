import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('investaccounts_id_unique', ['id'], { unique: true })
@Index('investaccounts_reference_unique', ['reference'], { unique: true })
@Index('investaccounts_login_server_unique', ['login', 'server'], {
  unique: true,
})
@Index('investAccountAccountIdIdx', ['accountId'], {})
@Index('investAccountCreatedIdx', ['created'], {})
@Entity('investAccounts')
export class InvestAccounts {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('varchar', { unique: false, length: 255 })
  public reference: string;

  @Column('varchar', { length: 255 })
  public login: string;

  @Column('varchar', { length: 64 })
  public platform: string;

  @Column('varchar', { length: 128 })
  public platformName: string;

  @Column('varchar', { length: 255 })
  public server: string;

  @Column('varchar', { nullable: true, length: 64 })
  public group: string | null;

  @Column('varchar', { nullable: true, length: 16 })
  public serverType: string | null;

  @Column('varchar', { length: 3 })
  public currency: string;

  @Column('varchar', { nullable: true, length: 255 })
  public partnership: string | null;

  @Column('varchar', { length: 16 })
  public status: string;

  @Column('varchar', { length: 32 })
  public subStatus: string;

  @Column('int', {
    nullable: true,
    default: () => "'0'",
    width: 1,
  })
  public supportsLeverage: number | null;

  @Column('int', { nullable: true, default: () => "'1'", width: 1 })
  public sendReports: number | null;

  @Column('varchar', { nullable: true, length: 255 })
  public lastUpdateHash: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public customName: string | null;

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
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'investaccounts_accountid_foreign' }])
  public account: Profiles;
}
