import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('ibans_number_unique', ['number'], { unique: true })
@Index('numberIdx', ['number'], {})
@Entity('ibans')
export class Ibans {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 34 })
  public number: string;

  @Column('text', { name: 'rawResponse' })
  public rawResponse: string;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
