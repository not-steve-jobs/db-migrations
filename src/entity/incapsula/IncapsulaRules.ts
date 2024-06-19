import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('incapsulaRules')
export class IncapsulaRules {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 34 })
  @Index('incapsulaRulesIpIdx')
  public ip: string;

  @Column('varchar', { length: 34 })
  public action: string;

  @Column('varchar', { length: 255 })
  @Index('incapsulaRulesRuleIdIdx')
  public ruleId: string;

  @Column('int', { name: 'unblockTs' })
  @Index('incapsulaRulesUnblockTsIdx')
  public unblockTs: number;

  @Column('text', { name: 'rawResponse' })
  public rawResponse: string;

  @Column('timestamp', { default: () => "'current_timestamp(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
