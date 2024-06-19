import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { QuestionnaireQuestions } from './QuestionnaireQuestions';
import { QuestionnaireGroups } from './QuestionnaireGroups';

@Index('questionnaireGroupQuestionsOrderQuestionIdIdx', ['questionId'], {})
@Entity('questionnaireGroupQuestionsOrder')
export class QuestionnaireGroupQuestionsOrder {
  @Column('bigint', { primary: true, name: 'groupId' })
  public groupId: string;

  @Column('bigint', { primary: true, name: 'questionId' })
  public questionId: string;

  @Column('datetime', {

    default: () => "'current_timestamp(6)'",
  })
  public createdAt: Date;

  @Column('datetime', { name: 'updatedAt', nullable: true, default: () => "'current_timestamp(6)'", precision: 6, onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date | null;

  @Column('int', { nullable: true })
  public orderPriority: number | null;

  @ManyToOne(() => QuestionnaireQuestions, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkQGQOQuestionnaireQuestionsQuestionIdIdx' }])
  public question: QuestionnaireQuestions;

  @ManyToOne(
    () => QuestionnaireGroups,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkQuestionnaireGroupsGroupIdIdx' }])
  public group: QuestionnaireGroups;
}
