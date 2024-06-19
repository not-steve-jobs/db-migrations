import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { QuestionnaireOptions } from './QuestionnaireOptions';

@Entity('questionnaireOptionsEligibleFor')
export class QuestionnaireOptionsEligibleFor {

  @PrimaryColumn('bigint', { nullable: false })
  public id: number;

  @PrimaryColumn('varchar', {  nullable: false, length: 255 })
  public eligibleFor: string | null;

  @ManyToOne(() => QuestionnaireOptions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fkQuestionnaireOptionsIdIdx',
    },
  ])
  public questionnaireOptions: QuestionnaireOptions;

}
