import { Column, Entity, Index } from 'typeorm';

@Index('relationsProfileIdx', ['profileId'], {})
@Index('relationsAttorneyIdx', ['attorneyId'], {})
@Entity('relations')
export class Relations {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('varchar', { length: 16, default: () => "'poa'" })
  public type: string;

  @Column('char', { length: 36 })
  public profileId: string;

  @Column('char', { length: 36 })
  public attorneyId: string;

  @Column('char', { length: 36 })
  public objectId: string;

  @Column('varchar', { length: 64 })
  public objectType: string;

  @Column('varchar', { length: 16 })
  public status: string;

  @Column('varchar', { length: 64 })
  public permission: string;

  @Column('varchar', { length: 64 })
  public stp: string;

  @Column('timestamp', { default: () => "'current_timestamp(3)'" })
  public created: Date;

  @Column('timestamp', { precision: 3, default: () => "'CURRENT_TIMESTAMP(3)'", onUpdate: 'CURRENT_TIMESTAMP(3)' })
  public updated: Date;
}
