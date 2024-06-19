import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { PaymentAccounts } from './PaymentAccounts';

@Entity('paymentAccountFields')
export class PaymentAccountFields {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('varchar', { length: 64 })
  public paymentAccountId: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('mediumtext', { name: 'value' })
  public value: string;

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

  @ManyToOne(
    () => PaymentAccounts,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkPaymentAccountIdx' }])
  public paymentAccount: PaymentAccounts;
}
