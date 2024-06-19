import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Products } from '../product/Products';
import { Countries } from '../product/Countries';
import { Authorities } from '../product/Authorities';

// @Index('activities_productname_foreign', ['productName'], {})
// @Index('activities_authoritycode_foreign', ['authorityCode'], {})
// @Index('activities_countryiso2_foreign', ['countryIso2'], {})
@Entity('activities')
export class Activities {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 32 })
  public productName: string;

  @Column('varchar', { nullable: true, length: 255 })
  public authorityCode: string | null;

  @Column('varchar', { nullable: true, length: 2 })
  public countryIso2: string | null;

  @Column('int', { name: 'order' })
  public order: number;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('tinyint', { width: 1 })
  public skip: boolean;

  @Column('tinyint', { width: 1 })
  public enabled: boolean;

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

  @ManyToOne(() => Authorities, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'authorityCode', referencedColumnName: 'code', foreignKeyConstraintName: 'activities_authoritycode_foreign' }])
  public authority: Authorities;

  @ManyToOne(() => Countries, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'countryIso2', referencedColumnName: 'iso2', foreignKeyConstraintName: 'activities_countryiso2_foreign' }])
  public country: Countries;

  @ManyToOne(() => Products, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'productName', referencedColumnName: 'name', foreignKeyConstraintName: 'activities_productname_foreign' }])
  public product: Products;
}
