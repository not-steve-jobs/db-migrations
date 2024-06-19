import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { QuestionnaireQuestions } from './QuestionnaireQuestions';

@Entity('questionnaireQuestionsEligibleFor')
export class QuestionnaireQuestionsEligibleFor {

  @PrimaryColumn('bigint', { nullable: false })
  public id: number;

  @PrimaryColumn('varchar', { nullable: false, length: 255 })
  public eligibleFor: string | null;

  @ManyToOne(() => QuestionnaireQuestions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fkQQEFQuestionnaireQuestionsIdIdx',
    },
  ])
  public questionnaireQuestions: QuestionnaireQuestions;
}
