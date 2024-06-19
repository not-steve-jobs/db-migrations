import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('clientMigrations')
export class ClientMigrations {
  @PrimaryColumn('varchar', { length: 64, nullable: false })
  public id: string;

  @Column('char', { nullable: true, length: 36 })
  @Index('clientMigrationsProfileIdIdx')
  public profileId: string | null;

  @Column('varchar', { length: 255 })
  @Index('clientMigrationsUniqueEmail', { unique: true })
  public email: string;

  @Column('varchar', { length: 255 })
  public status: string;

  @Column('int', { width: 10, nullable: false })
  public step: number;

  @Column('timestamp', { default: () => "'current_timestamp(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;

  @Column('text', { nullable: true })
  public warnings: string | null;
}
