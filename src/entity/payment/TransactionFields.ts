import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Transactions } from './Transactions';

// @Index('fkTransactionTransactionFieldsIdx', ['transactionId'], {})
@Entity('transactionFields')
export class TransactionFields {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('varchar', { length: 64 })
  public transactionId: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('mediumtext', { name: 'value' })
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
    () => Transactions,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkTransactionTransactionFieldsIdx' }])
  public transaction: Transactions;
}
