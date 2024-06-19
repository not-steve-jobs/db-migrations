import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Index('productsUniqueName', ['name'], { unique: true })
@Entity('products')
export class Products {
  @PrimaryColumn({ type: 'int', width: 10, nullable: false, generated: 'increment' })
  public id: number;

  @Index('productsNameIdx', ['name'], {})
  @Column('varchar', { length: 32 })
  public name: string;

  @Column('timestamp', {

    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  public updated: Date;

  // @OneToMany(() => Activities, activities => activities.productName2)
  // public activities: Activities[];
  //
  // @OneToMany(() => Identities, identities => identities.product)
  // public identities: Identities[];
  //
  // @OneToMany(
  //   () => ProductsAvailability,
  //   productsAvailability => productsAvailability.productName2
  // )
  // public productsAvailabilities: ProductsAvailability[];
}
