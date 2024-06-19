import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Clients } from '../client/Clients';

@Index(
  'verificationCodesClientIdCodeStatusIdx',
  ['clientId', 'code', 'status'],
  {}
)
@Entity('verificationCodes')
export class VerificationCodes {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public clientId: string;

  @Column('int', { name: 'code', width: 10 })
  public code: number;

  @Column('varchar', { length: 16, default: () => "'new'" })
  public status: string;

  @Column('varchar', {

    length: 15,
    default: () => "'passwordReset'",
  })
  public type: string;

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

  @ManyToOne(() => Clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkVerificationCodesClientId' }])
  public client: Clients;
}
