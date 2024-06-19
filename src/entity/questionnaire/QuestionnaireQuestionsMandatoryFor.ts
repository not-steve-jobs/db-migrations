import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { QuestionnaireQuestions } from './QuestionnaireQuestions';

@Entity('questionnaireQuestionsMandatoryFor')
export class QuestionnaireQuestionsMandatoryFor {

  @PrimaryColumn('bigint', { nullable: false })
  public id: number;

  @PrimaryColumn('varchar', { nullable: false, length: 255 })
  public mandatoryFor: string | null;

  @ManyToOne(() => QuestionnaireQuestions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fkQQMFQuestionnaireQuestionsIdIdx',
    },
  ])
  public questionnaireQuestions: QuestionnaireQuestions;
}
