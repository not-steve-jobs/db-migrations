import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LegalChecks } from './LegalChecks';

@Index('legalCheckFieldsUniqueLegalCheckIdKey', ['legalCheckId', 'key'], {
  unique: true,
})
@Index('fkLegalCheckFieldsLegalChecksIdx', ['legalCheckId'], {})
@Entity('legalCheckFields')
export class LegalCheckFields {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('int', { unsigned: true })
  public legalCheckId: number;

  @Column('varchar', { length: 255 })
  public key: string;

  @Column('text', { nullable: true })
  public value: string | null;

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

  @ManyToOne(() => LegalChecks, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkLegalCheckFieldsLegalChecks' }])
  public legalCheck: LegalChecks;
}
