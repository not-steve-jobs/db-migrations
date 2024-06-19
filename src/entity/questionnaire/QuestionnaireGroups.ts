import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('questionnaireGroupsUniqueGroupKey', ['groupKey'], { unique: true })
@Entity('questionnaireGroups')
export class QuestionnaireGroups {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: string;

  @Column('datetime', {

    default: () => 'current_timestamp(6)',
  })
  public createdAt: Date;

  @Column('datetime', {
    precision: 6,
    nullable: true,
    default: () => 'current_timestamp(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date | null;

  @Column('varchar', { nullable: true, length: 255 })
  public descriptionKey: string | null;

  @Column('bit', { nullable: true })
  public enabled: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public footerDescription: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public footerKey: string | null;

  @Column('varchar', {

    nullable: true,
    length: 255,
  })
  public groupKey: string | null;

  @Column('varchar', { length: 255 })
  public groupType: string;

  @Column('varchar', { nullable: true, length: 255 })
  public headerDescription: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public headerKey: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public imageKey: string | null;

  @Column('bit', { nullable: true })
  public immediate: boolean | null;

  @Column('bit', { nullable: true })
  public published: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public title: string | null;

  /*
  @OneToMany(
    () => QuestionnaireGroupQuestionsOrder,
    questionnaireGroupQuestionsOrder => questionnaireGroupQuestionsOrder.group
  )
  public questionnaireGroupQuestionsOrders: QuestionnaireGroupQuestionsOrder[];

  @OneToMany(
    () => QuestionnaireQuestionnaireGroupsOrder,
    questionnaireQuestionnaireGroupsOrder =>
      questionnaireQuestionnaireGroupsOrder.group
  )
  public questionnaireQuestionnaireGroupsOrders: QuestionnaireQuestionnaireGroupsOrder[];
   */
}
