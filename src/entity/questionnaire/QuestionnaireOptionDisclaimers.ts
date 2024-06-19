import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questionnaireOptionDisclaimers')
export class QuestionnaireOptionDisclaimers {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  public id: string;

  @Column('datetime', { default: () => "'current_timestamp(6)'" })
  public createdAt: Date;

  @Column('datetime', { precision: 6, nullable: true, default: () => "'current_timestamp(6)'", onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date | null;

  @Column('varchar', { nullable: true, length: 255 })
  public bodyDescription: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public bodyKey: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public buttonDescription: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public buttonKey: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public titleDescription: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  public titleKey: string | null;

  // @OneToMany(
  //   () => QuestionnaireOptions,
  //   questionnaireOptions => questionnaireOptions.optionDisclaimer
  // )
  // public questionnaireOptions: QuestionnaireOptions[];
}
