import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionnaireOptions } from './QuestionnaireOptions';


@Index('questionnaireQuestionsUniqueQuestionKey', ['questionKey', 'readOnly', 'mandatory'], { unique: true })
@Entity('questionnaireQuestions')
export class QuestionnaireQuestions {

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: string;

  @Column('datetime', { precision: 6, default: () => "'current_timestamp(6)'" })
  public createdAt: Date;

  @Column('datetime', { precision: 6, nullable: true, default: () => "'CURRENT_TIMESTAMP(6)'", onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date | null;

  @Column('varchar', {  nullable: true, length: 2048 })
  public description: string | null;

  @Column('bit', {  nullable: true })
  public enabled: boolean | null;

  @Column('varchar', {  length: 255 })
  public fieldType: string;

  @Column('varchar', {  nullable: true, length: 255 })
  public linkKey: string | null;

  @Column('varchar', {  nullable: true, length: 255 })
  public linkValue: string | null;

  @Column('bit', {  nullable: true })
  public mandatory: boolean | null;

  @Column('bit', {  nullable: true })
  public mandatoryCheckBoxValue: boolean | null;

  @Column('text', {  nullable: true })
  public mandatoryConditions: string | null;

  @Column('varchar', {  nullable: true, length: 255 })
  public projectedQuestionKey: string | null;

  @Column('bit', {  nullable: true })
  public published: boolean | null;

  @Column('varchar', {  nullable: true, length: 255 })
  public questionKey: string | null;

  @Column('bit', {  nullable: true })
  public readOnly: boolean | null;

  @Column('varchar', {  nullable: true, length: 255 })
  public validationKey: string | null;

  @Column('varchar', {  nullable: true, length: 255 })
  public validationPattern: string | null;

  @Column('bit', {  default: () => "'b'0''" })
  public hidden: boolean;

  @OneToMany(() => QuestionnaireOptions, questionnaireOptions => questionnaireOptions.question)
  public questionnaireOptions: QuestionnaireOptions[];

  @OneToMany(() => QuestionnaireOptions, questionnaireOptions => questionnaireOptions.fieldQuestion)
  public questionnaireOptions2: QuestionnaireOptions[];
}
