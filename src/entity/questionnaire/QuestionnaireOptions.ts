import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionnaireQuestions } from './QuestionnaireQuestions';
import { QuestionnaireOptionDisclaimers } from './QuestionnaireOptionDisclaimers';

@Index('questionnaireOptionsQuestionIdIdx', ['questionId'], {})
@Index('questionnaireOptionsOptionDisclaimerIdIdx', ['optionDisclaimerId'], {})
@Index('questionnaireOptionsFieldQuestionIdIdx', ['fieldQuestionId'], {})
@Entity('questionnaireOptions')
export class QuestionnaireOptions {

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: string;

  @Column('datetime', { precision: 6, default: () => "'current_timestamp(6)'" })
  public createdAt: Date;

  @Column('datetime', { precision: 6, nullable: true, default: () => "'CURRENT_TIMESTAMP(6)'", onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date | null;

  @Column('varchar', { nullable: true, length: 255 })
  public description: string | null;

  @Column('bit', { nullable: true })
  public enabled: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public optionKey: string | null;

  @Column('int', { nullable: true })
  public orderPriority: number | null;

  @Column('bit', { nullable: true })
  public published: boolean | null;

  @Column('double', { nullable: true, precision: 22 })
  public score: number | null;

  @Column('bigint', { nullable: true })
  public questionId: string | null;

  @Column('bigint', { nullable: true })
  public optionDisclaimerId: string | null;

  @Column('bigint', { nullable: true })
  public fieldQuestionId: string | null;

  @ManyToOne(
    () => QuestionnaireQuestions, questionnaireQuestions => questionnaireQuestions.questionnaireOptions,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ name: 'questionId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkQOQuestionnaireQuestionsQuestionIdIdx' }])
  public question: QuestionnaireQuestions;

  @ManyToOne(() => QuestionnaireOptionDisclaimers, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'optionDisclaimerId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkQuestionnaireOptionDisclaimersIdx' }])
  public optionDisclaimer: QuestionnaireOptionDisclaimers;

  @ManyToOne(
    () => QuestionnaireQuestions,
    questionnaireQuestions => questionnaireQuestions.questionnaireOptions2,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ name: 'fieldQuestionId', referencedColumnName: 'id', foreignKeyConstraintName: 'fkQuestionnaireQuestionsFieldQuestionIdIdx' }])
  public fieldQuestion: QuestionnaireQuestions;
}
