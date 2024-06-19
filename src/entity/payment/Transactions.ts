import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

import { TransactionFields } from './TransactionFields';
import { GroupTransactions } from './GroupTransactions';

@Index('transactionsUniqueReference', ['reference'], { unique: true })
@Index('transactionsAccountIdIdx', ['accountId'], {})
@Index('transactionsRefundedTransactionIdIdx', ['refundedTransactionId'], {})
@Index('transactionsAccountTransactionIdIdx', ['accountTransactionId'], {})
@Index('transactionsCheckoutIdIdx', ['checkoutId'], {})
@Index('fkGroupTransactionIdx', ['groupTransactionId'], {})
@Index('fkProfileTransactionsIdx', ['profileId'], {})
@Entity('transactions')
export class Transactions {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('varchar', { length: 36 })
  public groupTransactionId: string;

  @Column('int', { name: 'order', width: 10 })
  public order: number;

  @Column('varchar', { unique: false, length: 255 })
  public reference: string;

  @Column('varchar', { nullable: true, length: 20 })
  public accountType: string | null;

  @Column('varchar', { length: 64 })
  public accountId: string;

  @Column('varchar', {
    nullable: true,
    length: 255,
  })
  public accountTransactionId: string | null;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 32 })
  public status: string;

  @Column('varchar', { length: 16 })
  public type: string;

  @Column('decimal', {
    nullable: true,
    precision: 20,
    scale: 4,
  })
  public refundableAmount: string | null;

  @Column('char', { nullable: true, length: 3 })
  public currency: string | null;

  @Column('decimal', {

    nullable: true,
    precision: 20,
    scale: 4,
  })
  public amount: string | null;

  @Column('decimal', {
    nullable: true,
    precision: 20,
    scale: 4,
    default: () => "'0.0000'",
  })
  public feeAmount: string | null;

  @Column('decimal', {
    nullable: true,
    precision: 20,
    scale: 4,
    default: () => "'0.0000'",
  })
  public commissionAmount: string | null;

  @Column('char', { nullable: true, length: 3 })
  public incomingCurrency: string | null;

  @Column('decimal', {
    nullable: true,
    precision: 20,
    scale: 4,
  })
  public incomingAmount: string | null;

  @Column('decimal', {
    nullable: true,
    precision: 18,
    scale: 8,
  })
  public currencyRate: string | null;

  @Column('varchar', {
    nullable: true,
    length: 255,
  })
  public currencyRateSource: string | null;

  @Column('varchar', {
    name: 'refundedTransactionId',
    nullable: true,
    length: 64,
  })
  public refundedTransactionId: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public checkoutId: string | null;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public suspicious: boolean;

  @Column('varchar', { nullable: true, length: 510 })
  public description: string | null;

  @Column('timestamp', { nullable: true })
  public dateProcessed: Date | null;

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

  @OneToMany(
    () => TransactionFields,
    transactionFields => transactionFields.transaction
  )
  public transactionFields: TransactionFields[];

  @ManyToOne(
    () => GroupTransactions,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: '__fkGroupTransactionIdx' }])
  // The underscore prefix was added from percona-toolkit which was run on production to avoid locking the table
  // More details here: https://docs.percona.com/percona-toolkit/pt-online-schema-change.html
  public groupTransaction: GroupTransactions;

  @ManyToOne(() => Profiles, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: '_fkProfileTransactionsIdx' }])
  public profile: Profiles;
}
