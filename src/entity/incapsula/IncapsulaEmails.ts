import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('incapsulaEmails')
export class IncapsulaEmails {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  public id: number;

  @Column('varchar', { length: 34 })
  @Index('incapsulaEmailsIpIdx')
  public ip: string;

  @Column('varchar', { length: 255 })
  @Index('incapsulaEmailsEmailIdx')
  public email: string;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'" })
  @Index('incapsulaEmailsCreatedIdx')
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
