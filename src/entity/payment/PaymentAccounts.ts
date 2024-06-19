import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

@Entity('paymentAccounts')
export class PaymentAccounts {
  @Column('varchar', { primary: true, length: 64 })
  public id: string;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('varchar', { nullable: true, length: 255 })
  public reference: string | null;

  @Column('varchar', { nullable: true, length: 64 })
  public hash: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public holderName: string | null;

  @Column('varchar', {

    nullable: true,
    length: 255,
  })
  public paymentProviderAccountId: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public paymentProvider: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public processorName: string | null;

  @Column('varchar', { length: 16 })
  public status: string;

  @Column('char', { length: 3 })
  public currency: string;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('varchar', { nullable: true, length: 64 })
  public expiryDate: string | null;

  @Column('timestamp', {
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @Column('varchar', { length: 32 })
  public authority: string;

  // @OneToMany(
  //   () => PaymentAccountFields,
  //   paymentAccountFields => paymentAccountFields.paymentAccount
  // )
  // public paymentAccountFields: PaymentAccountFields[];

  @ManyToOne(() => Profiles,{
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkProfilePaymentAccountsIdx' }])
  public profile: Profiles;
}
