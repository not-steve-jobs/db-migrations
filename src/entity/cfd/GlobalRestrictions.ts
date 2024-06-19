import { Column, Entity, Index } from 'typeorm';

@Index(
  'globalRestrictionsUnique',
  ['authority', 'country', 'appropriateness', 'clientType', 'profileStatus'],
  { unique: true }
)
@Entity('globalRestrictions')
export class GlobalRestrictions {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { length: 32 })
  public authority: string;

  @Column('char', { length: 2, default: () => "''" })
  public country: string;

  @Column('varchar', {  length: 255, default: () => "''" })
  public appropriateness: string;

  @Column('varchar', { length: 255, default: () => "''" })
  public clientType: string;

  @Column('varchar', { length: 16, default: () => "''" })
  public riskAppetite: string;

  @Column('text', { name: 'restrictions' })
  public restrictions: string;

  @Column('timestamp', {  default: () => "'current_timestamp(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;

  @Column('varchar', { length: 36, default: () => "''" })
  public profileStatus: string;
}
