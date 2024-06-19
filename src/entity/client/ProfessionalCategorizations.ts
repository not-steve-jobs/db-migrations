import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from './Profiles';

@Index('professionalCategorizationsUniqueProfileId', ['profileId'], {
  unique: true,
})
@Index('fkProfessionalCategorizationsProfilesIdx', ['profileId'], {})
@Entity('professionalCategorizations')
export class ProfessionalCategorizations {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { unique: false, length: 36 })
  public profileId: string;

  @Column('int', { nullable: true, width: 10 })
  public eligibleAnswersCount: number | null;

  @Column('tinyint', {
    name: 'eligibleToBeProfessional',
    width: 1,
    default: () => "'0'",
  })
  public eligibleToBeProfessional: boolean;

  @Column('tinyint', {
    name: 'approvedForAcceptance',
    width: 1,
    default: () => "'0'",
  })
  public approvedForAcceptance: boolean;

  @Column('tinyint', {
    name: 'acceptanceSubmitted',
    width: 1,
    default: () => "'0'",
  })
  public acceptanceSubmitted: boolean;

  @Column('tinyint', {
    name: 'reassessmentRequested',
    width: 1,
    default: () => "'0'",
  })
  public reassessmentRequested: boolean;

  @Column('tinyint', {
    name: 'reassessmentSubmitted',
    width: 1,
    default: () => "'0'",
  })
  public reassessmentSubmitted: boolean;

  @Column('text', { nullable: true })
  public reassessmentAnswers: string | null;

  @Column('text', { nullable: true })
  public acceptanceAnswers: string | null;

  @Column('text', { nullable: true })
  public eligibleAnswers: string | null;

  @Column('timestamp', { nullable: true })
  public professionalSince: Date | null;

  @Column('timestamp', { nullable: true })
  public reassessmentSubmittedOn: Date | null;

  @Column('timestamp', { nullable: true })
  public acceptanceSubmittedOn: Date | null;

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

  @ManyToOne(
    () => Profiles,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkProfessionalCategorizationsProfiles' }])
  public profile: Profiles;
}
