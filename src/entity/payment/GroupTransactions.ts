import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index('groupTransactionsUniqueReference', ['reference'], { unique: true })
@Index('groupTransactionsUpdatedIdx', ['updated'])
@Index('groupTransactionsPaymentTypeIdx', ['paymentType'])
@Index('fkProfilesIdx', ['profileId'], {})
@Index('fkGroupTransactionsLinkedTo', ['linkedTo'], {})
@Entity('groupTransactions')
export class GroupTransactions {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { unique: false, length: 255 })
  public reference: string;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { length: 32 })
  public status: string;

  @Column('varchar', { length: 16 })
  public type: string;

  @Column('tinyint', { nullable: true, width: 1 })
  public stp: boolean | null;

  @Column('text', { nullable: true })
  public stpDescription: string | null;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public noCommission: boolean;

  @Column('varchar', {
    name: 'processingDescription',
    nullable: true,
    length: 255,
  })
  public processingDescription: string | null;

  @Column('decimal', {
    name: 'riskFactor',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  public riskFactor: string | null;

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

  @Column('varchar', { nullable: true, length: 255 })
  public paymentType: string | null;

  @Column('varchar', {
    name: 'paymentIntegrator',
    nullable: true,
    length: 255,
    default: () => "''",
  })
  public paymentIntegrator: string | null;

  @Column('char', { nullable: true, length: 36 })
  public linkedTo: string | null;

  @Column('varchar', { nullable: true, length: 16 })
  public linkedType: string | null;

  @Column('varchar', { nullable: true, length: 32 })
  public stpStatus: string | null;

  // @OneToMany(
  //   () => GroupTransactionFields,
  //   groupTransactionFields => groupTransactionFields.groupTransaction
  // )
  // public groupTransactionFields: GroupTransactionFields[];

  @ManyToOne(
    () => GroupTransactions,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'linkedTo', referencedColumnName: 'id', foreignKeyConstraintName: '_fkGroupTransactionsLinkedTo' }])
  public groupTransactions: GroupTransactions;

  // @OneToMany(
  //   () => GroupTransactions,
  //   groupTransactions => groupTransactions.linkedTo2
  // )
  // public groupTransactions: GroupTransactions[];

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: '_fkProfilesIdx' }])
  public profile: Profiles;

  // @OneToMany(
  //   () => Transactions,
  //   transactions => transactions.groupTransaction
  // )
  // public transactions: Transactions[];
}
