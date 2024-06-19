import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Profiles } from './Profiles';

@Entity('profileNotifications')
export class ProfileNotifications {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { nullable: false, length: 36 })
  public profileId: string;

  @Column('tinyint', { width: 1, nullable: false, default: () => '0' })
  public read: number;

  @Column('varchar', { length: 255, nullable: false })
  public type: string;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;

  @ManyToOne(
    () => Profiles,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'profileId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkProfileNotificationsProfiles' }])
  @Index('fkProfileNotificationsProfilesIdx')
  public profile: Profiles;

  // @ManyToOne(() => QuestionnaireOptionDisclaimers, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  // @JoinColumn([{ name: 'optionDisclaimerId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkQuestionnaireOptionDisclaimersIdx' }])
  // public optionDisclaimer: QuestionnaireOptionDisclaimers;
  //
  // @ManyToOne(
  //   () => QuestionnaireQuestions,
  //   questionnaireQuestions => questionnaireQuestions.questionnaireOptions2,
  //   { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  // )
  // @JoinColumn([{ name: 'fieldQuestionId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkQuestionnaireQuestionsFieldQuestionIdIdx' }])
  // public fieldQuestion: QuestionnaireQuestions;
}
