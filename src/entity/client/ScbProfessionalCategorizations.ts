import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from './Profiles';

@Index('scbprofessionalcategorizations_accountid_unique', ['accountId'], {
  unique: true,
})
@Entity('scbProfessionalCategorizations')
export class ScbProfessionalCategorizations {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', {
    nullable: true,
    unique: false,
    length: 36,
  })
  public accountId: string | null;

  @Column('int', { nullable: true, width: 10 })
  public eligibleAnswersCount: number | null;

  @Column('tinyint', {

    width: 1,
    default: () => "'0'",
  })
  public eligibleToBeProfessional: boolean;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public testCompleted: boolean;

  @Column('int', { nullable: true, width: 10 })
  public testScore: number | null;

  @Column('timestamp', { nullable: true })
  public testCompletedOn: Date | null;

  @Column('timestamp', { nullable: true })
  public testFailedOn: Date | null;

  @Column('int', { nullable: true, width: 10 })
  public selfCertificationAnswersCount: number | null;

  @Column('tinyint', {

    width: 1,
    default: () => "'0'",
  })
  public selfCertificationCompleted: boolean;

  @Column('timestamp', { nullable: true })
  public selfCertificationCompletedOn: Date | null;

  @Column('tinyint', {

    width: 1,
    default: () => "'0'",
  })
  public acknowledgementCompleted: boolean;

  @Column('timestamp', { nullable: true })
  public acknowledgementCompletedOn: Date | null;

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

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public isLegacy: boolean;

  @Column('timestamp', { nullable: true })
  public isLegacyOn: Date | null;

  @ManyToOne(
    () => Profiles,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'scbprofessionalcategorizations_accountid_foreign' }])
  public account: Profiles;
}
