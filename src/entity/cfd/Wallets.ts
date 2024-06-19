import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('walletsUniqueCurrencyProfileId', ['currency', 'profileId'], {
  unique: true,
})
@Index('walletsUniqueLoginServer', ['accountLogin', 'server'], { unique: true })
@Index('fkWalletsIdx', ['profileId'], {})
@Entity('wallets')
export class Wallets {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 255 })
  public reference: string;

  @Column('char', { length: 3 })
  public currency: string;

  @Column('char', { length: 16 })
  public status: string;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('varchar', { length: 255 })
  public accountLogin: string;

  @Column('varchar', { length: 255 })
  public server: string;

  @Column('varchar', { length: 64 })
  public group: string;

  @Column('varchar', { length: 256 })
  public partnership: string;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @Column('char', { length: 32, default: () => "''" })
  public substatus: string;

  @Column('varchar', { nullable: true, length: 255 })
  public lastUpdateHash: string | null;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkWalletsProfiles' }])
  public profile: Profiles;
}
