import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Clients } from '../client/Clients';

@Index('tins_id_unique', ['id'], { unique: true })
@Index('tins_clientid_country_tin_unique', ['clientId', 'country', 'tin'], {
  unique: true,
})
@Entity('tins')
export class Tins {
  @Column('char', { primary: true, length: 36 })
  public id: string;

  @Column('char', { length: 36 })
  public clientId: string;

  @Column('char', { nullable: true, length: 2 })
  public country: string | null;

  @Column('tinyint', { nullable: true, width: 1 })
  public isUsTaxResident: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public tin: string | null;

  @Column('tinyint', { width: 1, default: () => "'0'" })
  public isValid: boolean;

  @Column('tinyint', {

    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  public isFormSigned: boolean | null;

  @Column('varchar', { nullable: true, length: 255 })
  public formType: string | null;

  @Column('timestamp', {
    name: 'created',
    default: () => "'current_timestamp(3)'",
  })
  public created: Date;

  @Column('timestamp', {
    name: 'updated',
    default: () => "'current_timestamp(3)'",
    onUpdate: 'CURRENT_TIMESTAMP(3)',
    precision: 3,
  })
  public updated: Date;

  @ManyToOne(() => Clients, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'clientId', referencedColumnName: 'id', foreignKeyConstraintName: 'tins_clientid_foreign' }])
  public client: Clients;
}
