import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Profiles } from '../client/Profiles';
import { Products } from '../product/Products';
import { Clients } from '../client/Clients';

@Index(
  'identitiesUniqueOidClientIdAccountId',
  ['oid', 'clientId', 'accountId'],
  { unique: true }
)
@Entity('identities')
export class Identities {
  @PrimaryColumn({ type: 'int', name: 'id', width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { length: 36 })
  public oid: string;

  @Column('char', { length: 36 })
  public clientId: string;

  @Column('char', { length: 36 })
  public accountId: string;

  @Column('int', { name: 'productId', width: 10 })
  public productId: number;

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
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkIdentitiesClients' }])
  public client: Clients;

  @ManyToOne(() => Products, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkIdentitiesProducts' }])
  public product: Products;

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkIdentitiesProfiles' }])
  public account: Profiles;
}
