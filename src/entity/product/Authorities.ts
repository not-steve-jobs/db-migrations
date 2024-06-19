import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('authorities_code_unique', ['code'], { unique: true })
@Index('authoritiesCodeIdx', ['code'], {})
@Entity('authorities')
export class Authorities {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 255 })
  public name: string;

  @Column('varchar', { unique: false, length: 255 })
  public code: string;

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

  // @OneToMany(() => Activities, activities => activities.authorityCode2)
  // public activities: Activities[];
  //
  // @OneToMany(
  //   () => ProductsAvailability,
  //   productsAvailability => productsAvailability.authorityCode2
  // )
  // public productsAvailabilities: ProductsAvailability[];
}
