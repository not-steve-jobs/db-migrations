import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('swift_number_unique', ['number'], { unique: true })
@Index('numberIdx', ['number'], {})
@Entity('swifts')
export class Swifts {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 34 })
  public number: string;

  @Column('text', {
    name: 'rawResponse',
    default: () => "''",
  })
  public rawResponse: string;

  @Column('timestamp', { default: () => "'current_timestamp(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
