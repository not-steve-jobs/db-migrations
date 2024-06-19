import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { Profiles } from '../client/Profiles';

@Unique('legalChecksUniqueAccountId', ['accountId'])
@Entity('legalChecks')
export class LegalChecks {
  @PrimaryColumn({ type: 'int', unsigned: true, width: 10, generated: 'increment' })
  public id: number;

  @Column('char', { unique: false, length: 36, nullable: false })
  public accountId: string;

  @Column('varchar', { nullable: true, length: 255 })
  public poiState: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public porState: string | null;

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

  // @OneToMany(
  //   () => LegalCheckFields,
  //   legalCheckFields => legalCheckFields.legalCheck
  // )
  // public legalCheckFields: LegalCheckFields[];

  @ManyToOne(() => Profiles, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkLegalChecksProfiles' }])
  public profile: Profiles;
}
