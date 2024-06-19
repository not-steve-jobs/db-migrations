import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

import { AuthenticationTokens } from './AuthenticationTokens';

@Index('mfaTokensMfaTokenIdx', ['mfaToken'], {})
// @Index('fkMfaTokensProfileId', ['profileId'], {})
// @Index('fkMfaTokensAuthenticationTokenId', ['authenticationTokenId'], {})
@Entity('mfaTokens')
export class MfaTokens {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('int', { name: 'authenticationTokenId', width: 10 })
  public authenticationTokenId: number;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('char', { length: 36 })
  public mfaToken: string;

  @Column('int', { name: 'code', width: 10 })
  public code: number;

  @Column('varchar', { length: 16 })
  public type: string;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public used: boolean;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public expired: boolean;

  @Column('timestamp', {

    default: () => "'current_timestamp(3)'",
  })
  public expiredAt: Date;

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
    () => AuthenticationTokens,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'authenticationTokenId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkMfaTokensAuthenticationTokenId' }])
  public authenticationToken: AuthenticationTokens;

  @ManyToOne(() => Profiles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'profileId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkMfaTokensProfileId'  }])
  public profile: Profiles;
}
