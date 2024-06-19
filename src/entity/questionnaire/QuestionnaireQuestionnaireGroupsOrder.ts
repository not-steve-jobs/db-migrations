import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { QuestionnaireGroups } from './QuestionnaireGroups';
import { QuestionnaireQuestionnaires } from './QuestionnaireQuestionnaires';

@Index('questionnaireQuestionnaireGroupsOrderIdx', ['questionnaireId'], {})
@Entity('questionnaireQuestionnaireGroupsOrder')
export class QuestionnaireQuestionnaireGroupsOrder {
  @Column('bigint', { primary: true, name: 'groupId' })
  public groupId: string;

  @Column('bigint', { primary: true, name: 'questionnaireId' })
  public questionnaireId: string;

  @Column('datetime', {
    name: 'createdAt',
    default: () => "'current_timestamp(6)'",
  })
  public createdAt: Date;

  @Column('datetime', {
    name: 'updatedAt',
    precision: 6,
    nullable: true,
    default: () => 'current_timestamp(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date | null;

  @Column('int', { nullable: true })
  public orderPriority: number | null;

  @ManyToOne(
    () => QuestionnaireGroups,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkQQGOQuestionnaireGroupsGroupIdIdx' }])
  public group: QuestionnaireGroups;

  @ManyToOne(
    () => QuestionnaireQuestionnaires,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ referencedColumnName: 'id', foreignKeyConstraintName: 'fkQQGOQuestionnaireQuestionnairesQuestionnaireIdIdx' }])
  public questionnaire: QuestionnaireQuestionnaires;
}
