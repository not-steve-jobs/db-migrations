import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Activities } from '../../entity-generated/Activities';
//import { ProductsAvailability } from '../../entity-generated/ProductsAvailability';

@Index('countries_iso2_unique', ['iso2'], { unique: true })
@Index('countries_iso3_unique', ['iso3'], { unique: true })
@Index('countriesIso2Idx', ['iso2'], {})
@Index('countriesIso3Idx', ['iso3'], {})
@Entity('countries')
export class Countries {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 255 })
  public name: string;

  @Column('varchar', { length: 2 })
  public iso2: string;

  @Column('varchar', { length: 3 })
  public iso3: string;

  @Column('int', { name: 'numeric' })
  public numeric: number;

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

  /*
  @OneToMany(() => Activities, activities => activities.countryIso)
  public activities: Activities[];

  @OneToMany(
    () => ProductsAvailability,
    productsAvailability => productsAvailability.countryIso
  )
  public productsAvailabilities: ProductsAvailability[];
   */
}
