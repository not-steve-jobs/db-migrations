import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Authorities } from './Authorities';
import { Countries } from './Countries';
import { Products } from './Products';

@Index(
  'productsAvailabilityUnqProductCountryAuthority',
  ['productName', 'countryIso2', 'authorityCode'],
  { unique: true }
)
@Entity('productsAvailability')
export class ProductsAvailability {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 32 })
  public productName: string;

  @Column('varchar', { length: 2 })
  public countryIso2: string;

  @Column('varchar', { length: 255 })
  public authorityCode: string;

  @Column('varchar', { length: 255 })
  public status: string;

  @Column('tinyint', { width: 1 })
  public isDefault: boolean;

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
    () => Authorities,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'code', foreignKeyConstraintName: 'productsavailability_authoritycode_foreign' }])
  public authority: Authorities;

  @ManyToOne(() => Countries, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'iso2', foreignKeyConstraintName: 'productsavailability_countryiso2_foreign' }])
  public country: Countries;

  @ManyToOne(() => Products, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ referencedColumnName: 'name', foreignKeyConstraintName: 'productsavailability_productname_foreign' }])
  public product: Products;
}
