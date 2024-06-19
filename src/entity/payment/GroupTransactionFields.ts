import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GroupTransactions } from './GroupTransactions';

// @Index('fkGroupTransactionFieldsIdx', ['groupTransactionId'], {})
@Entity('groupTransactionFields')
export class GroupTransactionFields {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('char', { length: 36 })
  public groupTransactionId: string;

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
    () => GroupTransactions,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkGroupTransactionFieldsIdx' }])
  public groupTransaction: GroupTransactions;
}
