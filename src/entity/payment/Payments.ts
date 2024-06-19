import { Column, Entity, Index } from 'typeorm';

@Index(
  'paymentsUniqueStateStatusProviderOriginalPaymentId',
  ['state', 'status', 'provider', 'originalPaymentId', 'merchantReference'],
  { unique: true }
)
@Entity('payments')
export class Payments {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { length: 16 })
  public state: string;

  @Column('varchar', { length: 16 })
  public status: string;

  @Column('varchar', { length: 255 })
  public provider: string;

  @Column('varchar', { length: 255, default: '' })
  public originalPaymentId?: string;

  @Column('varchar', { length: 255, default: '' })
  public authPaymentId?: string;

  @Column('varchar', { length: 255, default: '' })
  public groupTransactionOrderId?: string;

  @Column('decimal', { precision: 20, scale: 4 })
  public amount: number;

  @Column('char', { length: 3 })
  public currency: string;

  @Column('decimal', { precision: 20, scale: 4, default: 0 })
  public fee?: number;

  @Column('decimal', {
    name: 'refundableAmount',
    nullable: true,
    precision: 20,
    scale: 4,
  })
  public refundableAmount: string | null;

  @Column('varchar', { length: 40 })
  public merchantReference: string;

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

  // @OneToMany(
  //   () => PaymentsTimeline,
  //   paymentsTimeline => paymentsTimeline.payment
  // )
  // public paymentsTimelines: PaymentsTimeline[];
}
