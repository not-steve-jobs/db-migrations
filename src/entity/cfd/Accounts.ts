import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('accountsUniqueLoginServer', ['login', 'server'], { unique: true })
@Index('fkAccountProfilesIdx', ['profileId'], {})
@Entity('accounts')
export class Accounts {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 255 })
  public login: string;

  @Column('varchar', { length: 64 })
  public platform: string;

  @Column('varchar', { nullable: true, length: 128 })
  public platformName: string | null;

  @Column('varchar', { length: 255 })
  public server: string;

  @Column('varchar', { length: 32, default: () => "'real'" })
  public type: string;

  @Column('varchar', { nullable: true, length: 64 })
  public group: string | null;

  @Column('varchar', { nullable: true, length: 16 })
  public serverType: string | null;

  @Column('char', { nullable: true, length: 3 })
  public currency: string | null;

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

  @Column('varchar', {
    length: 256,
    default: () => "''",
  })
  public partnership: string;

  @Column('char', { length: 16 })
  public status: string;

  @Column('char', { length: 32, default: () => "''" })
  public substatus: string;

  @Column('tinyint', {
    name: 'supportsLeverage',
    width: 1,
    default: () => "'1'",
  })
  public supportsLeverage: boolean;

  @Column('varchar', { nullable: true, length: 255 })
  public lastUpdateHash: string | null;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public sendReports: boolean;

  @Column('tinyint', { nullable: true, width: 1 })
  public depositLimitReached: boolean | null;

  @Column('tinyint', { nullable: false, width: 1, default: () => "'0'" })
  public autoApprovalLegalChecks: boolean;

  @ManyToOne(() => Profiles,{
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkAccountsProfiles' }])
  public profile: Profiles;
}
