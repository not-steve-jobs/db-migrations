import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

//import { QuestionnaireQuestionnaireGroupsOrder } from './QuestionnaireQuestionnaireGroupsOrder';

@Index(
  'questionnaireQuestionnairesUnqAuthorityCountryProductPlatform',
  ['authority', 'country', 'product', 'platform'],
  { unique: true }
)
@Entity('questionnaireQuestionnaires')
export class QuestionnaireQuestionnaires {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: string;

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

  @Column('varchar', { nullable: true, length: 255 })
  public authority: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public brand: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public country: string | null;

  @Column('bit', { nullable: true })
  public enabled: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public platform: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public product: string | null;

  @Column('bit', { nullable: true })
  public published: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public title: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public version: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public tag: string | null;

  /*
  @OneToMany(
    () => QuestionnaireQuestionnaireGroupsOrder,
    questionnaireQuestionnaireGroupsOrder =>
      questionnaireQuestionnaireGroupsOrder.questionnaire
  )
  public questionnaireQuestionnaireGroupsOrders: QuestionnaireQuestionnaireGroupsOrder[];
   */
}
