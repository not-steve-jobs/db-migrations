import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, PrimaryColumn,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

@Index(
  'accountStatesUniqueProfileIdEntityComplexKey',
  ['accountId', 'entityId', 'entityType', 'key'],
  { unique: true }
)
@Index('fkAccountStatesProfileIdx', ['accountId'], {})
@Entity('accountStates')
export class AccountStates {
  @PrimaryColumn({ type: 'int', width: 10, nullable: false, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('char', { length: 36 })
  public entityId: string;

  @Column('char', { length: 36 })
  public entityType: string;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('text', { name: 'value' })
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

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkAccountStatesProfile' }])
  public account: Profiles;
}
