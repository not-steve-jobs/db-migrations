import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('fkJobStatusIdx', ['status'], {})
@Index('fkJobExpectedStartDateIdx', ['expectedStartDate'], {})
@Entity('schedulerJobs')
export class SchedulerJobs {
  @PrimaryColumn('varchar', { length: 64, nullable: false })
  public id: string;

  @Column('varchar', { length: 200, nullable: false })
  public name: string;

  @Column('varchar', { length: 20, nullable: false })
  public status: string;

  @Column('timestamp', { nullable: true, precision: 3 })
  public expectedStartDate?: Date;

  @Column('smallint', { nullable: false })
  public retries: number;

  @Column('smallint', { nullable: false })
  public leftRetries: number;

  @Column('int', { nullable: true })
  public recurringIntervalMinutes?: number;

  @Column({ type: 'varchar', length: 255 })
  public apiUrl: string;

  @Column({ type: 'varchar', length: 10 })
  public apiMethod: string;

  @Column('json', { nullable: true })
  public data?: JSON;
  
  @Column('text', { nullable: true })
  public errorInfo?: string;

  @Column('varchar', { length: 36, nullable: true })
  public requestId?: string;

  @Column('timestamp', { default: () => "'current_timestamp(3)'", precision: 3 })
  public created: Date;

  @Column('timestamp', { default: () => "'current_timestamp(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)', precision: 3 })
  public updated: Date;
}
