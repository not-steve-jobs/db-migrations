import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Clients } from '../client/Clients';

@Index('authenticationTokensAccessTokenIdx', ['accessToken'], {})
@Index('authenticationTokensRefreshTokenIdx', ['refreshToken'], {})
@Index('authenticationTokensProductIdx', ['product'], {})
// @Index('fkAuthenticationTokensClientId', ['clientId'], {})
@Entity('authenticationTokens')
export class AuthenticationTokens {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public clientId: string;

  @Column('varchar', { nullable: true, length: 64 })
  public product: string | null;

  @Column('varchar', { length: 1500 })
  public accessToken: string;

  @Column('varchar', { nullable: true, length: 800 })
  public refreshToken: string | null;

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

  @ManyToOne(() => Clients,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'clientId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkAuthenticationTokensClientId' }])
  public client: Clients;

  // @OneToMany(() => MfaTokens, mfaTokens => mfaTokens.authenticationToken)
  // public mfaTokens: MfaTokens[];
}
