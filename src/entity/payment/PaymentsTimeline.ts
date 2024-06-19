import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Payments } from './Payments';

@Index('paymentsTimelineStateIdx', ['state'], {})
@Index('paymentsTimelineStatusIdx', ['status'], {})
@Entity('paymentsTimeline')
export class PaymentsTimeline {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public paymentId: string;

  @Column('varchar', { length: 16 })
  public state: string;

  @Column('varchar', { length: 16 })
  public status: string;

  @Column('text', {
    name: 'rawRequest',
    default: () => "''",
  })
  public rawRequest: string;

  @Column('text', {
    name: 'rawResponse',
    default: () => "''",
  })
  public rawResponse: string;

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

  @ManyToOne(() => Payments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkPaymentsTimelinePayments' }])
  public payment: Payments;
}
